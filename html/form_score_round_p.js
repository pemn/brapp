angular.module('app').controller('form_score_round_p', function ($scope, apiphp, $http) {
  $scope.round_id = 0;
  $scope.br_g = [];
  $scope.br_a = [];
  $scope.round_ids = [];
  $scope.round = [];
  var round_size = 10;
  
  apiphp.get({table: 'br_g'}, function(result) {
    $scope.br_g = result['br_g'];
    for(var i=0;i < $scope.br_g.length;i+=round_size) {
      $scope.round_ids.push((i / round_size)+1);
    }
    // this request must be nested to prevent race condition
    apiphp.get({table: 'br_s'}, function(result) {
      $scope.round_id = Math.floor(result['br_s'].length / round_size) + 1;
    });
  });
  

  $scope.onRoundSelect = function(){
    if($scope.br_g.length == 0) return;
    console.log("onRoundSelect");
    $scope.round.length = 0;
    for(var i=round_size;i>0;i--) {
      $scope.round.push($scope.br_g[$scope.round_id * round_size - i]);
    }
  };

  $scope.$watch('round_id', $scope.onRoundSelect);

  $scope.submitForm = function(){
    console.log("submitForm");
    var target_table = "br_s";
    data = [];
    for(var i=0;i<$scope.round.length;i++) {
      data.push({"id": $scope.round[i].id, "a": $scope.round[i].a, "b": $scope.round[i].b});
    }
    console.log(data);
    $http.post('/php-crud-api/api.php/' + target_table + '/', data).then(function(result) {
      console.log(result);
      alert("form data saved");
    });
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Administradores', class: 'danger'});
  $menuProvider.add({name: 'Definir resultados oficiais', href: 'form_score_round_p'});
});

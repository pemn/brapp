angular.module('app').controller('form_bet_round_p', function ($scope, apiphp) {
  $scope.user_id = 0;
  $scope.round_id;
  $scope.br_g = [];
  $scope.users = [];
  $scope.br_a = [];
  $scope.round_ids = [];
  $scope.round = [];
  var round_size = 10;


  // request game names
  apiphp.get({table: 'br_g'}, function(result) {
    $scope.br_g = result['br_g'];
    // fill round list select
    for(var i=0;i < $scope.br_g.length;i+=round_size) {
      $scope.round_ids.push((i / round_size)+1);
    }
    // game results so far
    // this request must be nested to prevent race condition
    apiphp.get({table: 'br_s'}, function(result) {
      // set the current round on the round list select
      $scope.round_id = Math.floor(result['br_s'].length / round_size) + 1;
    });
  });
  // user list
  apiphp.get({table: 'br_u'}, function(result) {
    $scope.users = result['br_u'];
  });

  $scope.onRoundSelect = function(newValue, oldValue){
    if(! newValue) return;
    if($scope.br_g.length == 0) return;
    $scope.round.length = 0;
    for(var i=round_size;i>0;i--) {
      var j = $scope.round_id * round_size - i
      if(j < $scope.br_g.length) {
        $scope.round.push($scope.br_g[j]);
      }
    }
  };
  
  $scope.$watch('round_id', $scope.onRoundSelect);

  $scope.submitForm = function(){
    console.log("submitForm");
    var target_table = "br_a";
    console.log("user_id: " + $scope.user_id);
    if ($scope.user_id <= 0) {
      alert("invalid user_id");
      return;
    }
    data = [];
    //var get_url = '/php-crud-api/api.php/' + target_table + '/?transform=true&filter[]=user_id,eq,' + $scope.user_id;
    //$http.get(get_url).then(function(result) {
    apiphp.get({table: target_table, 'filter[]': 'user_id,eq,' + $scope.user_id}, function(result) {
      console.log(result);
      var table_data = result[target_table];

      for(var i=0;i< table_data.length;i++) {
        // check if the round being inputed is earlier than any of those already on database
        if(table_data[i]["game_id"] > ($scope.round_id - 1) * round_size) {
          alert("this round already passed");
          return;
        }
      }
      for(var i=0;i<$scope.round.length;i++) {
        data.push({"user_id": $scope.user_id, "game_id": $scope.round[i].id, "a": $scope.round[i].a, "b": $scope.round[i].b});
      }
      console.log(data);
      
      //$http.post('/php-crud-api/api.php/' + target_table + '/', data).then(function(result) {
      apiphp.post({table: target_table}, data, function(result) {
        console.log(result);
        alert("form data saved");
      });
      
      //apiphp.save({table: 'br_a_d', data).then(function(result) {
    });
  };

});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Enviar palpites', href: 'form_bet_round_p'});
});

angular.module('app').controller('form_score_match_p', function ($scope, apiphp, $resource) {
  $scope.items = [];
  $scope.match = {id: -1, a: undefined, b: undefined};
  
  apiphp.get({table: 'br_scores'}, function(result) {
    $scope.items = result['br_scores'];
  });
  
  $scope.submitForm = function(){
    console.log("submitForm");
    console.log($scope.match);
    //$resource('/php-crud-api/api.php/:table/:id', {transform: true, id: '@id'}, {'put': {method:'PUT'}}).put({table: 'br_s_d'}, $scope.match, function(result) {
    apiphp.put({table: 'br_s_d'}, $scope.match, function(result) {
      console.log(result);
      alert("form data saved");
    });
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Corrigir um resultado oficial', href: 'form_score_match_p'});
});


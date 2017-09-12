angular.module('app').controller('form_approve_p', function ($scope, apiphp) {
  $scope.user = {};
  
  apiphp.get({table: 'br_v3'}, function(result) {
    $scope.items = result['br_v3'];
  });

  $scope.submitForm = function(){
    console.log("submitForm");
    $scope.user.id = undefined;
    console.log($scope.user);
    apiphp.save({table: 'br_u'}, $scope.user, function(result) {
      console.log(result);
      alert("form data saved");
    });
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Solicitar inscrição', href: 'form_approve_p'});
});

angular.module('app').controller('form_apply_p', function ($scope, apiphp) {
  $scope.user = {id: undefined};
  
  $scope.submitForm = function(){
    console.log("submitForm");
    console.log($scope.user);
    apiphp.save({table: 'br_c', id: "@id"}, 
      $scope.user, function(result) {
      console.log('result');
      console.log(result);
      window.location = "apply_thankyou.html";
    });
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Não Usuarios', class: 'warning'});
  $menuProvider.add({name: 'Solicitar inscrição', href: 'form_apply_p'});
});

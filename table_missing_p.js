angular.module('app').controller('table_missing_p', function ($scope, apiphp) {
  apiphp.get({table: 'br_missing'}, function(result) {
    console.log(result);
    $scope.grid.data = result['br_missing'];
  });

  $scope.grid = {
    enableRowHeaderSelection: false,
    enableFiltering: true,
    enableGridMenu: true,
    exporterMenuPdf: false,
    onRegisterApi: function(gridApi){
      this.gridApi = gridApi;
      console.log("onRegisterApi");
    }
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Lista de pessoas que ainda não enviaram palpite para a rodada atual', href: 'table_missing_p'});
});

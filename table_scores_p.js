angular.module('app').controller('table_scores_p', function ($scope, apiphp) {
  apiphp.get({table: 'br_scores'}, function(result) {
    console.log(result);
    $scope.grid.data = result['br_scores'];
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
  $menuProvider.add({name: 'Resultados oficiais das partidas', href: 'table_scores_p'});
});

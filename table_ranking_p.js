angular.module('app').controller('table_ranking_p', function ($scope, apiphp) {
  apiphp.get({table: 'br_ranking'}, function(result) {
    console.log(result);
    $scope.grid.data = result['br_ranking'];
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
  $menuProvider.add({name: 'Ranking dos participantes', href: 'table_ranking_p'});
});

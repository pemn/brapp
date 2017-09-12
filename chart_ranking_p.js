angular.module('app').controller('chart_ranking_p', function ($scope, apiphp) {
  $scope.labels = [];
  $scope.series = [];
  $scope.data = [];
  $scope.data_ranking = [];
  $scope.options = {legend: { display: true }, elements: {line: {fill: false}}};

  //Chart.defaults.line.fill = false;
  apiphp.get({table: 'br_chart'}, function(result) {
    console.log(result);
    var raw_data = result['br_chart'];
    var tab_data = {};
    var tab_data_ranking = {};
    for(var i=0;i < raw_data.length;i++) {
      var name = raw_data[i]["name"];
      var value = parseInt(raw_data[i]["points"]);
      if(tab_data.hasOwnProperty(name)) {
        tab_data[name].push(value);
      } else {
        tab_data[name] = [value];
      }
    }

    $scope.series = Object.keys(tab_data);
    var n_labels = 0;
    // find the longest series
    for(var i=0; i < $scope.series.length; i++) {
      n_labels = Math.max(n_labels, tab_data[$scope.series[i]].length);
    }
    // create the labels for the X axis
    for(var i=0; i < n_labels; i++) {
      $scope.labels.push(i+1);
    }
    for(var i=0; i < $scope.series.length;i++) {
      $scope.data.push(tab_data[$scope.series[i]]);
      var accumulated = [tab_data[$scope.series[i]][0]];
      for(var j=1; j < tab_data[$scope.series[i]].length; j++) {
        accumulated.push(accumulated[j-1] + tab_data[$scope.series[i]][j]);
      }
      $scope.data_ranking.push(accumulated);
    }
  });
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Gráficos das pontuações', href: 'chart_ranking_p'});
});

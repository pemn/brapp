angular.module('app').controller('form_new_round_p', function ($scope, apiphp, $http) {
  $scope.teams = ['atletico-go',
                  'atletico-mg',
                  'atletico-pr',
                  'avai',
                  'bahia',
                  'botafogo',
                  'chapecoense',
                  'corinthians ',
                  'coritiba',
                  'cruzeiro',
                  'flamengo',
                  'fluminense ',
                  'gremio',
                  'palmeiras',
                  'ponte-preta',
                  'santos',
                  'sao-paulo',
                  'sport',
                  'vasco',
                  'vitoria'];
  
  $scope.home = [];
  $scope.away = [];
  $scope.matches = [];
  for(var i=0; i < $scope.teams.length / 2;i++) {
    $scope.matches.push(i);
    //$scope.home.push($scope.teams[0]);
    //$scope.away.push($scope.teams[0]);
  }
  $scope.submitForm = function(){
    console.log("submitForm");
    console.log($scope.home);
    data = [];
    
    for(var i=0;i<$scope.matches.length;i++) {
      data.push({"name": $scope.home[i] + ' x ' + $scope.away[i]});
    }
    console.log(data);
    apiphp.post({table: 'br_g'}, data, function(result) {
      console.log(result);
      alert("form data saved");
    });
  };
});

// add this partial and controller to the menu service
angular.module('app').config(function($menuProvider) {
  $menuProvider.add({name: 'Inserir nova rodada', href: 'form_new_round_p'});
});

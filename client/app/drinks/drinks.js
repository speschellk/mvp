// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.$watch('search', function() {
      fetch($scope, $http);
    });
  });

function fetch($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    console.log(res.data.drinks);
    $scope.drinks = res.data.drinks;

  })
  .catch(function(err) {
    console.log('Spilled your drink!', err);
  });
}

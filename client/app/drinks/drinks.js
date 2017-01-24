// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.$watch('search', function() {
      fetchByIngredient($scope, $http);
    });
  });

function fetchByIngredient($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    // console.log('drinks data is', res.data.drinks);
    for (var i = 0; i < res.data.drinks.length; i++) {
      // console.log('in the for loop');
      if (res.data.drinks[i].strDrinkThumb !== null) {
        // console.log('in the if check');
        $scope.drinks.push(res.data.drinks[i]);
      }
    }
    return $scope.drinks;
    // $scope.drinks = res.data.drinks;

  })
  .catch(function(err) {
    console.log('Spilled your drink!', err);
  });
}

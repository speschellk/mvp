// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.$watch('search', function() {
      if ($scope.search === '') {
        $scope.drinks = [];
      }
      fetchByIngredient($scope, $http);
    });
    $scope.$watch('search2', function() {
      console.log('search2 is', $scope.search2);
      if ($scope.search2 !== '') {
        filterByIngredient($scope, $http);
      } else {
        $scope.drinks = [];
        fetchByIngredient($scope, $http);
      }
    });
  });

function fetchByIngredient($scope, $http) {
  var ingredientResults = $scope.drinks;
  $scope.ingredientResults = ingredientResults;

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    console.log('drinks data is', res.data.drinks);
    if (res.data.drinks !== null) {
      for (var i = 0; i < res.data.drinks.length; i++) {
        // console.log('in the for loop');
        if (res.data.drinks[i].strDrinkThumb !== null && !ingredientResults.includes(res.data.drinks[i])) {
          // console.log('in the if check');
          ingredientResults.push(res.data.drinks[i]);
        }
      }
      return ingredientResults;
    } else {
      console.log('There were no results for your search');
    }
  })
  .catch(function(err) {
    console.log('Oops, we spilled your drink!', err);
  });
}

function filterByIngredient($scope, $http, ingredientResults) {
  $scope.filterResults = [];

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search2
  })
  .then(function(res) {
    if (res.data.drinks !== null) {
      for (var i = 0; i < res.data.drinks.length; i++) {

        if (res.data.drinks[i].strDrinkThumb !== null) {
          var id = res.data.drinks[i].idDrink;

          for (var j = 0; j < $scope.ingredientResults.length; j++) {

            if ($scope.ingredientResults[j].idDrink === id && !$scope.filterResults.includes(res.data.drinks[i])) {
              $scope.filterResults.push(res.data.drinks[i]);
            }
          }
        }
      }
    }
    $scope.drinks = $scope.filterResults;
    console.log('filtered results are', $scope.filterResults);
    return $scope.drinks;
  })
  .catch(function(err) {
    console.log('Oops, we spilled your drink!', err);
  });
}

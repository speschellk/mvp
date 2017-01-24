// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.$watch('search', function() {
      fetchByIngredient($scope, $http);
    });
    $scope.$watch('search2', function() {
      filterByIngredient($scope, $http);
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
    for (var i = 0; i < res.data.drinks.length; i++) {
      // console.log('in the for loop');
      if (res.data.drinks[i].strDrinkThumb !== null) {
        // console.log('in the if check');
        ingredientResults.push(res.data.drinks[i]);
      }
    }
    return ingredientResults;
  })
  .catch(function(err) {
    console.log('Spilled your drink!', err);
  });
}

function filterByIngredient($scope, $http, ingredientResults) {
  $scope.filterResults = [];

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search2
  })
  .then(function(res) {
    console.log('second drinks data is', res.data.drinks);
    for (var i = 0; i < res.data.drinks.length; i++) {
      console.log('in the filter for loop');
      // console.log('in the for loop');
      if (res.data.drinks[i].strDrinkThumb !== null) {
        console.log('in the filter if check');
        // console.log('in the if check');
        var id = res.data.drinks[i].idDrink;

        for (var j = 0; j < $scope.ingredientResults.length; j++) {
          console.log('ingredient results id', $scope.ingredientResults[j].idDrink);
          if ($scope.ingredientResults[j].idDrink === id) {
            $scope.filterResults.push(res.data.drinks[i]);
          }
        }
        // if ($scope.ingredientResults.includes(res.data.drinks[i])) {
        //   console.log('checking if first results include filter results');
        //   $scope.filterResults.push(res.data.drinks[i]);
        // }
      }
    }
    $scope.drinks = $scope.filterResults;
    console.log('filtered results are', $scope.filterResults);
    return $scope.drinks;
  })
  .catch(function(err) {
    console.log('Spilled your drink!', err);
  });
}

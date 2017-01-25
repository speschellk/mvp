// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.$watch('search', function() {
      if ($scope.search === '') {
        $scope.drinks = [];
      } else {
        if ($scope.drinks.length !== 0) {
          $scope.drinks = [];  
        }
        fetchByIngredient($scope, $http);
      }
    });
    $scope.$watch('search2', function() {
      if ($scope.search2 !== '') {
        filterByIngredient($scope, $http);
      } else {
        $scope.drinks = [];
        fetchByIngredient($scope, $http);
      }
    });
    $scope.recipe = function() {
      $scope.drinkId = this.drink.idDrink;

      $http({
        method: 'GET',
        url: 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + $scope.drinkId
      })
      .then(function(res) {
        console.log('res is', res.data.drinks[0]);
        $scope.ingredients = [];

        $scope.ingredients.push(res.data.drinks[0].strGlass);

        for (var i = 0; i < 15; i++) {
          var measurement = res.data.drinks[0]['strMeasure' + i];
          var ingredient = res.data.drinks[0]['strIngredient' + i];

          if (measurement !== '' && measurement !== undefined && ingredient !== '' && ingredient !== undefined) {
            $scope.ingredients.push(measurement + ' - ' + ingredient);
          }
        }

        $scope.ingredients.push(res.data.drinks[0].strInstructions);
        console.log('ingredients is', $scope.ingredients);
        return $scope.ingredients;
      })
      .catch(function(err) {
        console.log('There was an error finding your recipe', err);
      });
    };
  });

function fetchByIngredient($scope, $http) {
  var ingredientResults = $scope.drinks;
  $scope.ingredientResults = ingredientResults;

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    if (res.data.drinks !== null) {

      for (var i = 0; i < res.data.drinks.length; i++) {

        if (res.data.drinks[i].strDrinkThumb !== null && !ingredientResults.includes(res.data.drinks[i])) {
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
    return $scope.drinks;
  })
  .catch(function(err) {
    console.log('Oops, we spilled your drink!', err);
  });
}

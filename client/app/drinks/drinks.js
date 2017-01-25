angular.module('cocktail', [])

  .controller('DrinksController', function($scope, $http) {
    // responds to entries in base liquor text input field
    $scope.$watch('search', function() {
      if ($scope.search === '') {
        reset($scope);
      } else {
        if ($scope.drinks.length !== 0) {
          reset($scope);
        }
        fetch($scope, $http);
      }
    });

    // responds to entries in second ingredient text input field
    $scope.$watch('search2', function() {
      if ($scope.search2 !== '') {
        filter($scope, $http);
      } else {
        reset($scope);
        fetch($scope, $http);
      }
    });

    // retrieves recipe for clicked drink
    $scope.recipe = function() {
      $scope.drinkId = this.drink.idDrink;
      $http({
        method: 'GET',
        url: 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + $scope.drinkId
      })
      .then(function(res) {
        var drinkData = res.data.drinks[0];
        reset($scope);
        $scope.drinks.push(drinkData);

        // exclude anomalous glass type data
        if (drinkData.strGlass !== 'vote') {
          $scope.ingredients.push(drinkData.strGlass);
        }

        // concatenate ingredients and their measurements for easy display
        for (var i = 0; i < 15; i++) {
          var measurement = drinkData['strMeasure' + i];
          var ingredient = drinkData['strIngredient' + i];
          if (measurement !== '' && measurement !== undefined && ingredient !== '' && ingredient !== undefined) {
            $scope.ingredients.push(measurement + ' - ' + ingredient);
          }
        }

        // add mixing instructions
        $scope.ingredients.push(drinkData.strInstructions);
        return $scope.ingredients;
      })
      .catch(function(err) {
        console.log('There was an error finding your recipe', err);
      });
    };
  });

// queries drinks API for drinks using first ingredient
function fetch($scope, $http) {
  var drinkOptions = $scope.drinks;
  $scope.drinkOptions = drinkOptions;

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    var results = res.data.drinks;
    if (results !== null) {

      for (var i = 0; i < results.length; i++) {
        // exclude results with no thumbnail or that are already in drink list
        if (results[i].strDrinkThumb !== null && !drinkOptions.includes(results[i])) {
          drinkOptions.push(results[i]);
        }
      }
      return drinkOptions;
    } else {
      console.log('There were no results for your search');
    }
  })
  .catch(function(err) {
    console.log('Oops, we spilled your drink!', err);
  });
}

// filters first ingredient results by second ingredient
function filter($scope, $http, drinkOptions) {
  $scope.filtered = [];

  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search2
  })
  .then(function(res) {
    var results = res.data.drinks;

    if (results !== null) {

      for (var i = 0; i < results.length; i++) {
        // exclude resutls with no thumbnail
        if (results[i].strDrinkThumb !== null) {
          var id = results[i].idDrink;

          for (var j = 0; j < $scope.drinkOptions.length; j++) {

            // adds result to list if it matches one in the first ingredient's drink list
            if ($scope.drinkOptions[j].idDrink === id && !$scope.filtered.includes(results[i])) {
              $scope.filtered.push(results[i]);
            }
          }
        }
      }
    }
    $scope.drinks = $scope.filtered;
    return $scope.drinks;
  })
  .catch(function(err) {
    console.log('Oops, we spilled your drink!', err);
  });
}

// resets drinks and ingredients lists
function reset($scope) {
  $scope.drinks = [];
  $scope.ingredients = [];
}

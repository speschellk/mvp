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
      console.log('search2 is', $scope.search2);
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
        // str.Drink = name
        // str.DrinkThumb = pic
        // strGlass = glass
        // strIngredient1 = ingredient
        // strMeasure1 = amount of ing. 1
        // strIngredient2 = ingredient2
        // strMeasure2 = amoutn of ing. 2
        // etc.
        // strInstructions = how to mix
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
    console.log('drinks data is', res.data.drinks);
    if (res.data.drinks !== null) {
      for (var i = 0; i < res.data.drinks.length; i++) {
        // console.log('in the for loop');
        if (res.data.drinks[i].strDrinkThumb !== null && !ingredientResults.includes(res.data.drinks[i])) {
          // console.log('in the if check');
          ingredientResults.push(res.data.drinks[i]);
        }
      }
      // getRecipes($scope, $http, ingredientResults);
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

// function getRecipes($scope, $http, arr) {
//   for (var i = 0; i < arr.length; i++) {
//     $scope.id = arr[i].idDrink;
//     console.log('id is', $scope.id);
//     $http({
//       method: 'GET',
//       url: 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + $scope.id
//     })
//     .then(function(res) {
//       console.log('recipe res is', res.data);
//       $scope.drinks.push(res.data.drinks);
//     })
//     .catch(function(err) {
//       console.log('Error finding recipe', err);
//     });
//   }
//   return $scope.drinks;
// }

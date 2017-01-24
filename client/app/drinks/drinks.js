// find the module 'cocktail'
angular.module('cocktail', [])

// make a controller on it
  .controller('DrinksController', function($scope, $http) {
    $scope.search = 'Vodka';
    // console.log('inside controller')
    $scope.$watch('search', function() {
      fetch($scope, $http);
    });
  });

function fetch($scope, $http) {
  // console.log('calling fetch function')
  $http({
    method: 'GET',
    url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search
  })
  .then(function(res) {
    console.log('data is', res.data.drinks[0].strDrink);
    $scope.drinks = res.data.drinks[0].strDrink;

  })
  .catch(function(err) {
    console.log('Spilled your drink!', err);
  });
}

  // var initializeDrinks = function () {
  //   Drinks.getAll()
  //     .then(function (drinks) {
  //       $scope.data.drinks = drinks;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  // initializeDrinks();
// });

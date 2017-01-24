angular.module('cocktail-menu.drinks', [])

.controller('DrinksController', function ($scope, Drinks) {

  $scope.data = {};

  var initializeDrinks = function () {
    Drinks.getAll()
      .then(function (drinks) {
        $scope.data.drinks = drinks;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  initializeDrinks();
});

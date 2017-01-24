angular.module('cocktail-menu', [])

.controller('DrinksController', function ($scope, $http) {
  $scope.$watch('search', function() {
    fetch();
  });

  $scope.search = 'Vodka';

  function fetch() {
    $http.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + $scope.search)
    .then(function(res) {
      console.log('res is', res);
      console.log('data is', res.data);
      $scope.drinks = res.data;
    })
    .catch(function(err) {
      console.log('Error fetching drinks', err);
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
});

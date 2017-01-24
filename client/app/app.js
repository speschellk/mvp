angular.module('cocktail-menu', [
  'cocktail-menu.drinks',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './index.html',
      controller: 'AuthController'
    });
});
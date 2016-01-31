"use strict";

angular.module('mw.home.home', [])
  .controller('HomeController', [
    '$scope', 'blogsService',
    function ($scope, blogsService) {
      $scope.loaded = false;

      blogsService.getRecent()
        .then(function (recent) {
          $scope.recent = recent;
        })
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/wp-content/themes/disjointedthinking/templates/home.html",
      controller: "HomeController"
    });
  }]);
"use strict";

angular.module('mw.controllers.home', [])
  .controller('HomeController', [
    '$scope', 'pagesService',
    function ($scope, pagesService) {
      $scope.loaded = false;

      pagesService.findBySlug('home').then(function (page) {
        if (page) {
          $scope.loaded = true;
          $scope.title = page.title;
          $scope.content = page.content;
        }
      });
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/wp-content/themes/disjointedthinking/templates/views/home.html",
      controller: "HomeController"
    });
  }]);
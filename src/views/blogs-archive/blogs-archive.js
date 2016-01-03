"use strict";

angular.module('mw.blogs-archive.blogs-archive', [])
  .controller('BlogsArchiveController', [
    '$scope', 'blogsService', '$state',
    function ($scope, blogsService, $state) {
      $scope.loaded = false;

      blogsService.getArchive($state.params.year, $state.params.month)
        .then(function () {

        });
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('archive', {
        url: "/{year}/{month}/",
        templateUrl: "/wp-content/themes/disjointedthinking/templates/blogs-archive.html",
        controller: "BlogsArchiveController"
      });
  }]);
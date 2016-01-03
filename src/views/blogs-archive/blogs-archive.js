"use strict";

angular.module('mw.blogs-archive.blogs-archive', [])
  .controller('BlogsArchiveController', [
    '$scope', 'blogsService', '$state',
    function ($scope, blogsService, $state) {
      $scope.loaded = false;

      blogsService.getArchive($state.params.year, $state.params.month)
        .then(function (blogs) {
          if (blogs && blogs.length) {
            $scope.loaded = true;

            $scope.year = $state.params.year;
            $scope.month = $state.params.month;
            $scope.moment = moment($scope.year + '-' + $scope.month + '-01', 'YYYY-MM-DD');

            $scope.models = _(blogs)
              .map(function (blog) {
                return {
                  title: blog.title,
                  date: blog.moment,
                  year: blog.year,
                  month: blog.month,
                  day: blog.day,
                  name: blog.name,
                  excerpt: blog.excerpt.replace('[&hellip;]', '')
                }
              }).value()
          }
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
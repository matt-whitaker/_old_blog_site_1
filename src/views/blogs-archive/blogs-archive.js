"use strict";

function processExcerpt (excerpt) {
  if (['!', '.', '?'].indexOf(excerpt[excerpt.length - 1]) === -1) {
    return excerpt + '...';
  }

  return excerpt;
}

angular.module('mw.blogs-archive.blogs-archive', [])
  .controller('BlogsArchiveController', [
    '$rootScope', '$scope', 'blogsService', '$state', 'archiveService',
    function ($rootScope, $scope, blogsService, $state, archiveService) {
      $scope.loading = true;
      $rootScope.$emit('loading', true);

      archiveService.getArchive($state.params.year, $state.params.month)
        .then(function (blogs) {
          if (blogs && blogs.length) {
            $scope.loading = false;
            $rootScope.$emit('loading', false);

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
                  excerpt:  processExcerpt(blog.excerpt)
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
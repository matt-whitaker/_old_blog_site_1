"use strict";

angular.module('mw.controllers.blog', [])
  .controller('BlogController', [
    '$scope', '$state', '$sce', '$compile', 'blogsService',
    function ($scope, $state, $sce, $compile, blogsService) {
      $scope.loaded = false;

      blogsService.findBySlug($state.params.slug).then(function (blog) {
        if (blog) {
          $scope.loaded = true;
          $scope.title = blog.title;
          $scope.date = blog.moment;
          $scope.content = blog.content;
          $scope.tags = _.map(blog.tags, function (tag) {
            return tag.name;
          });
        }
      });
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('blog', {
      url: "/{slug}/",
      templateUrl: "/wp-content/themes/disjointedthinking/templates/views/blog.html",
      controller: 'BlogController'
    })
  }]);
"use strict";

angular.module('mw.blog.blog', [])
  .controller('BlogController', [
    '$rootScope', '$scope', '$state', '$sce', '$compile', 'blogsService',
    function ($rootScope, $scope, $state, $sce, $compile, blogsService) {
      $scope.loading = true;
      $rootScope.$emit('loading', true);

      blogsService.findBySlug($state.params.slug).then(function (blog) {
        if (blog) {
          $scope.loading = false;
          $rootScope.$emit('loading', false);

          $scope.model = {
            title: blog.title,
            date: blog.moment,
            content: blog.content,
            tags: _.map(blog.tags, function (tag) {
              return tag.name;
            })
          };
        }
      });
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('blog', {
      url: "/{slug}/",
      templateUrl: "/wp-content/themes/disjointedthinking/templates/blog.html",
      controller: 'BlogController'
    })
  }]);
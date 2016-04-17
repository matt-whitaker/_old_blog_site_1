"use strict";

angular.module('mw.blog', [])
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
              return {
                name: tag.name,
                title: tag.title,
                description: tag.description
              };
            }),

            attachment: blog.attachment && {
              guid: blog.attachment.guid
            },

            prevName: blog.prevName,
            nextName: blog.nextName
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
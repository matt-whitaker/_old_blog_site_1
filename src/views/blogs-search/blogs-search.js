"use strict";

function tokenize (query) {
  return query;
}

angular.module('mw.blogs-search.blogs-search', [])
  .controller('BlogsSearchController', [
    '$scope', '$state', 'blogsService',
    function ($scope, $state, blogsService) {

      var query = $state.params.query;
      var tags = $state.params.tag;
      var category = $state.params.category;

      if (query) {
        $scope.query = query;

        blogsService.findByQuery(query);
      } else if (tags && tags.length) {
        $scope.tags = tags;

        blogsService.findByTag(query);
      } else if (category) {
        $scope.category = category;

        blogsService.findByCategory(query);
      }

      blogsService.findAll()
        .then(function (blogs) {
          $scope.models = _(blogs)
            .map(function (blog) {
              var excerpt = blog.excerpt;

              blog.excerpt = '<p>' + excerpt + '</p>';
              return blog;
            }).value();
        })
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: "/search?query&category&tag",
        params: {
          tag: { array: true }
        },
        templateUrl: "/wp-content/themes/disjointedthinking/templates/blogs-search.html",
        controller: "BlogsSearchController"
      });
  }]);
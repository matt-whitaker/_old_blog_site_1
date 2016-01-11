"use strict";

function tokenize (query) {
  return query;
}

function processExcerpt (excerpt) {
  if (['!', '.', '?'].indexOf(excerpt[excerpt.length - 1]) === -1) {
    return excerpt + '...';
  }

  return excerpt;
}

angular.module('mw.blogs-search.blogs-search', [])
  .controller('BlogsSearchController', [
    '$scope', '$state', 'blogsService',
    function ($scope, $state, blogsService) {

      var query = $state.params.q;
      var tags = $state.params.t;
      var category = $state.params.c;

      var promise;

      if (query) {
        promise = blogsService.findByQuery($scope.query = query);
      } else if (tags && tags.length) {
        promise = blogsService.findByTag($scope.tags = tags);
      } else if (category) {
        promise = blogsService.findByCategory($scope.category = category);
      }

      promise
        .then(function (blogs) {
          $scope.models = _(blogs)
            .map(function (blog) {
              var excerpt = processExcerpt(blog.excerpt);

              blog.excerpt = '<p>' + excerpt + '</p>';
              return blog;
            }).value();
        })
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: "/search?q&c&t",
        params: {
          tag: { array: true }
        },
        templateUrl: "/wp-content/themes/disjointedthinking/templates/blogs-search.html",
        controller: "BlogsSearchController"
      });
  }]);
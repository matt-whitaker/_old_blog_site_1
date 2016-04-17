"use strict";

function tokenize (query) {
  return query;
}

function processExcerpt (excerpt) {
  //if (['!', '.', '?'].indexOf(excerpt[excerpt.length - 1]) === -1) {
  //  return excerpt + '...';
  //}

  return excerpt;
}

angular.module('mw.blogs-search', [])
  .controller('BlogsSearchController', [
    '$rootScope', '$scope', '$state', 'blogsService',
    function ($rootScope, $scope, $state, blogsService) {
      $scope.loading = true;
      $rootScope.$emit('loading', true);

      var query = $state.params.q;
      var tags = _.flatten([$state.params.t]);
      var category = $state.params.c;

      var promise;

      if (query) {
        promise = blogsService.findByQuery($scope.query = query);
      } else if (tags && tags.length && tags[0]) {
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

          $scope.loading = false;
          $rootScope.$emit('loading', false);
        });


      $scope.postprocess = function (html) {
        html.find("a").contents().unwrap().wrap('<span class="was-anchor"></span>');
        return html;
      };
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
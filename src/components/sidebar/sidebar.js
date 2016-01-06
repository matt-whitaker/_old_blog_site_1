"use strict";

angular.module('mw.sidebar.sidebar', [])

  .directive('sidebar', [
    '$q', '$http', '$state', 'templatesBase', 'blogsService',
    function ($q, $http, $state, templatesBase, blogsService) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'sidebar.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-sidebar');

          scope.loading = {};

          scope.search = function ($evt) {
            if (($evt === true || $evt.which === 13) && scope.search.query && scope.search.query.length) {
              $state.go('search', { query: scope.search.query }, { inherit: false });
            }
          }
        }
      }
    }
  ]);
"use strict";

angular.module('mw.sidebar.sidebar', [])

  .directive('sidebar', [
    '$q', '$http', '$state', 'templatesBase', 'blogsService', '$location',
    function ($q, $http, $state, templatesBase, blogsService, $location) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'sidebar.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-sidebar');

          var scrollingContainer = elem.children('aside').first();

          scope.loading = {};
          scope.search = {
            query: $location.search().q
          };

          scope.search = function () {
            $state.go('search', { q: scope.search.query }, { inherit: false });
          };

          Ps.initialize(scrollingContainer[0]);
        }
      }
    }
  ]);
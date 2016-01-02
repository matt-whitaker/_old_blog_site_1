"use strict";

angular.module('mw.sidebar.sidebar', [])

  .directive('mwSidebar', [
    '$q', '$http', 'templatesBase', 'blogsService',
    function ($q, $http, templatesBase, blogsService) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'sidebar.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-sidebar');

          scope.loading = {};
        }
      }
    }
  ]);
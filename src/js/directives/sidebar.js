"use strict";

angular.module('mw.directives.sidebar', [])

  .directive('mwSidebar', [
    '$q', '$http', 'templatesBase', 'blogsService',
    function ($q, $http, templatesBase, blogsService) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'directives/sidebar.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-sidebar');
        }
      }
    }
  ]);
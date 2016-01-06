"use strict";

angular.module('mw.post-search.post-search', [])
  .directive('postSearch', [
    '$q', '$http', '$state', 'templatesBase', 'blogsService',
    function ($q, $http, $state, templatesBase, blogsService) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'post-search.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-post-search');
        }
      }
    }
  ]);
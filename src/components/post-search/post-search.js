"use strict";

angular.module('mw.post-search.post-search', [])
  .directive('postSearch', [
    '$q', '$http', '$state', 'templatesBase', 'blogsService',
    function ($q, $http, $state, templatesBase, blogsService) {
      return {
        restrict: 'E',
        scope: {
          model: '=',
          onSearch: '='
        },
        templateUrl: templatesBase + 'post-search.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-post-search');

          scope.submit = function ($evt) {
            if (($evt === true || $evt.which === 13) && scope.model && scope.model.length) {
              scope.onSearch();
            }
          }
        }
      }
    }
  ]);
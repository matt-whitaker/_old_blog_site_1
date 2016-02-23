"use strict";

angular.module('mw.nav-recent', [])

  .directive('navRecent', [
    '$q', '$http', 'templatesBase', 'blogsService',
    function ($q, $http, templatesBase, blogsService) {
      return {
        restrict: 'E',
        templateUrl: templatesBase + 'nav-recent.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-recent');

          scope.loading.recent = true;
          blogsService.getRecent()
            .then(function (recent) {
              scope.loading.recent = false;
              scope.recent = recent;
            }, function () {
              scope.loading.recent = false;
            })
        }
      }
    }
  ]);
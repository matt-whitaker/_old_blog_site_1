"use strict";

angular.module('mw.nav-archive.nav-archive', [])

  .directive('navArchive', [
    '$q', '$http', 'templatesBase', 'blogsService',
    function ($q, $http, templatesBase, blogsService) {
      return {
        restrict: 'E',
        templateUrl: templatesBase + 'nav-archive.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-archive');

          scope.loading.archive = true;
          blogsService.getArchiveMonths()
            .then(function (archive) {
              scope.loading.archive = false;

              return archive;
            }, function () {
              scope.loading.archive = false;
            })
            .then(function (archive) {
              scope.archive = archive;
            });
        }
      }
    }
  ]);
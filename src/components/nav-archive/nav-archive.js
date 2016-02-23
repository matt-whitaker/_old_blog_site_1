"use strict";

angular.module('mw.nav-archive', [])

  .directive('navArchive', [
    '$q', '$http', 'templatesBase', 'archiveService',
    function ($q, $http, templatesBase, archiveService) {
      return {
        restrict: 'E',
        templateUrl: templatesBase + 'nav-archive.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-archive');

          scope.loading.archive = true;
          archiveService.getMonths()
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
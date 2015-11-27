"use strict";

angular.module('mw.controllers.archive', [])
  .controller('ArchiveController', [
    '$scope', 'blogsService',
    function ($scope, blogsService) {
      $scope.loaded = false;

      function buildTree(obj, values) {
        if (!values.length) {
          return obj;
        }

        var partitioned = _.partitionWithLabel(obj, values[0]),
          rest = values.slice(1);

        for (var i = 0; i < partitioned.length; i++) {
          partitioned[i] = buildTree(partitioned[i], rest);
        }

        return partitioned;
      }


      blogsService.getArchive()
        .then(function (postsDates) {
          $scope.loaded = true;

          if (!postsDates.length) {
            return;
          }

          $scope.archive = buildTree(postsDates, ['year', 'month']);
        });

      $scope.monthLabel = function (month) {
        return moment().month(month).format("MMMM");
      }
    }
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('archive', {
        url: "/archive/",
        templateUrl: "/wp-content/themes/disjointedthinking/templates/views/archive.html",
        controller: "ArchiveController"
      })
      .state('archive.month', {
        url: "{year}/{month}",
        templateUrl: "/wp-content/themes/disjointedthinking/templates/views/archive.html",
        controller: "ArchiveController"
      });
  }]);
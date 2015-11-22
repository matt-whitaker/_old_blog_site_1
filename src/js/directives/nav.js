"use strict";

angular.module('mw.directives.nav', [])
  .directive('mwNav', [
    'templatesBase',
    function  (templatesBase) {
      var MAX_ITEMS = 6;

      return {
        controller: [
          '$scope', 'blogsService', '$q', '$http',
          function ($scope, blogsService, $q, $http) {
            $scope.loaded = false;

            $q.all([
              blogsService.getRecent()
                .then(function (posts) {
                  $scope.recent = {
                    title: "recent",
                    links: posts
                  };
                }),

              blogsService.getArchive()
                .then(function (postsDates) {
                  $scope.archive = {
                    title: "archive",
                    links: []
                  };

                  if (!postsDates.length) {
                    return;
                  }

                  var links = $scope.archive.links;
                  links.push(postsDates[0]);

                  for (var i = 1; links.length < MAX_ITEMS && i < postsDates.length; i++) {
                    if (links[links.length-1].month !== postsDates[i].month) {
                      links.push(postsDates[i]);
                    }
                  }
                }),

              blogsService.getCharts()
                .then(function (chartPosts) {
                  if (!chartPosts.length) {
                    return;
                  }

                  $scope.visuals = {
                    title: "visualizations",
                    links: chartPosts
                  }
                })
            ]).then(function () {
              $scope.loaded = true;
            })
          }
        ],
        templateUrl: templatesBase + 'directives/nav.html'
      }
    }
  ]);
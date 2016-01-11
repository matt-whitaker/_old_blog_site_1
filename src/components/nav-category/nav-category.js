"use strict";

angular.module('mw.nav-category.nav-category', [])

  .directive('navCategory', [
    '$q', '$http', 'templatesBase', 'categoriesService',
    function ($q, $http, templatesBase, categoriesService) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'nav-category.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-category');

          categoriesService.findAll()
            .then(function (categories) {
              scope.categories = _(categories)
                .filter(function (category) {
                  return category.title !== 'Uncategorized'
                }).value();
            });
        }
      }
    }
  ]);
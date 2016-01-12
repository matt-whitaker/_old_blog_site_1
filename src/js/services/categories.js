"use strict";

angular.module('mw.services.categories', [])
  .factory('categoriesService', [
    '$http', 'customApiBase', 'apiBase',
    function ($http, customApiBase, apiBase) {
      return Object.create({
        '$http': $http,
        customApiBase: customApiBase,
        apiBase: apiBase,

        findAll: function () {
          return this.$http.get(this.apiBase + 'categories/', { cache: true })
            .then(function (result) {
              var categories = result.data;
              return categories.length
                ? _(categories)
                  .map(function (category) {
                    return {
                      title: category.name,
                      name: category.slug
                    }
                  }).value()
                : [];
            });
        }
      });
    }
  ]);
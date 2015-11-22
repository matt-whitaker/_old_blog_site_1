"use strict";

angular.module('mw.services.pages', [])
  .factory('pagesService', [
    '$http', 'customApiBase',
    function ($http, customApiBase) {
      return Object.create({
        '$http': $http,
        customApiBase: customApiBase,

        findBySlug: function (slug) {
          return this.$http.get(this.customApiBase + 'pages/' + slug, { cache: true })
            .then(function (result) {
              var page = result.data;
              return page ? {
                title: page.post_title,
                content: page.post_content
              } : null;
            });
        }
      });
    }
  ]);
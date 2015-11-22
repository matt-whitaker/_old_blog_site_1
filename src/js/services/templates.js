"use strict";

angular.module('mw.services.templates', [])
  .factory('templatesService', [
    '$templateCache', '$http',
    function ($templateCache, $http) {
      var promises = {};
      return Object.create({
        get: function (filename) {
          var template = $templateCache.get(filename);

          if (template) {
            return $q.when(template);
          }

          return promises[filename] || (promises[filename] = $http.get(filename)
            .then(function (file) {
              $templateCache.put(filename, file.data);
              return $templateCache.get(filename);
            }));
        }
      });
    }
  ]);
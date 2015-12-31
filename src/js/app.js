angular.module('mw.app')
  .constant('apiBase', '/wp-json/wp/v2/')
  .constant('customApiBase', '/wp-json/dt/v1/')
  .constant('templatesBase', '/wp-content/themes/disjointedthinking/templates/')
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });
  }])
  .run(function () {

  });
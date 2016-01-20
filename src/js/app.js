angular.module('mw.app')
  .constant('apiBase', '/wp-json/wp/v2/')
  .constant('customApiBase', '/wp-json/dt/v1/')
  .constant('templatesBase', '/wp-content/themes/disjointedthinking/templates/')
  .config(['$locationProvider', 'templatesBase', function ($locationProvider, templatesBase) {
    $locationProvider.html5Mode({
      enabled: true
    });

    window.Dev = {};
  }])
  .run(['$rootScope', '$document', function ($rootScope, $document) {
    var scrollingContainer = angular.element($document[0].body).children('div').first();

    // configs
    angular.extend($rootScope, {
      toolbar: {
        active: false
      },
      page: {

      },
      sidebar: {
        active: true
      }
    });

    $rootScope.toggleSidebar = function (toggle) {
      $rootScope.sidebar.active = toggle;
    };

    scrollingContainer.perfectScrollbar();

    $rootScope.$on('$stateChangeSuccess', function () {
      scrollingContainer.scrollTop(0).perfectScrollbar('update');
    });
  }]);
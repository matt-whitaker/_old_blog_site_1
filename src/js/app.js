// mixins (lodash)
require('./mixins/groupByMulti.js');
require('./mixins/partitionWithLabel.js');

// services
require('./services/blogs.js');
require('./services/taxonomies.js');
require('./services/templates.js');

// filters
require('./filters/prettyDate.js');
require('./filters/prettyMonth.js');

// controllers
require('./controllers/home.js');
require('./controllers/archive.js');
require('./controllers/blogs.js');
require('./controllers/blog.js');


// directives
require('./directives/utils/bindHtml.js');
require('./directives/utils/toggleLink.js');
require('./directives/calendar.js');
require('./directives/nav.js');
require('./directives/overlay.js');
require('./directives/charts/test.js');

angular.module('mw.app',
  [
    // dependencies
    'ui.router',
    'ngAnimate',
    'ngScrollSpy',

    // services
    'mw.services.blogs',
    'mw.services.taxonomies',
    'mw.services.templates',

    // filters
    'mw.filters.prettyDate',
    'mw.filters.prettyMonth',

    // controllers
    'mw.controllers.home',
    //'mw.controllers.blogs', // Disable this in favor of Archive list
    'mw.controllers.archive',
    'mw.controllers.archive',
    'mw.controllers.blog', // This one needs to be last!

    // directives
    'mw.directives.utils.bindHtml',
    'mw.directives.utils.toggleLink',
    'mw.directives.nav',
    'mw.directives.calendar',
    'mw.directives.overlay',
    'mw.directives.charts.test' // Keep this in to fiddle with
  ])
  .constant('apiBase', '/wp-json/wp/v2/')
  .constant('customApiBase', '/wp-json/dt/v1/')
  .constant('templatesBase', '/wp-content/themes/disjointedthinking/templates/')
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });
  }]);
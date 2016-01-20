"use strict";

// =========== DEPENDENCIES

// System
var path        = require('path');

// Utils
var es          = require('event-stream');
var prettyJson  = require('prettyjson');
var through2    = require('through2');
var del         = require('del');
var _           = require('lodash');
var bowerFiles  = require('main-bower-files');
var argv        = require('yargs').argv;
var sequence    = require('run-sequence');

// Gulp
var gulp        = require('gulp');
var flatten     = require('gulp-flatten');
var browserify  = require('gulp-browserify');
var less        = require('gulp-less');
var template    = require('gulp-template');
var symlink     = require('gulp-sym');
var uglify      = require('gulp-uglify');
var gif         = require('gulp-if');
var rename      = require('gulp-rename');
var minifyCss   = require('gulp-minify-css');
var zip         = require('gulp-zip');

// Custom
var angularify   = require('./tasks/angularify.js');
var bindOutput   = require('./tasks/bindOutput.js');

// =========== END DEPENDENCIES



// =========== ENVIRONMENT

var pkg         = require('./package.json');

// =========== END ENVIRONMENT



// =========== PATHS

var BUILD_NAME = 'disjointedthinking';
var WORKING_DIRECTORY = process.cwd() + '/';

var DIST_PATH_ROOT = 'dist/' + BUILD_NAME + '/';
var DEPLOY_PATH_ROOT = 'dist/';

var IMAGE_SRC_PATH = 'assets/images/';
var SCRIPTS_SRC_PATH = 'scripts/';

var COMPONENTS_SRC_PATH = 'src/components/';
var VIEWS_SRC_PATH = 'src/views/';
var TEMPLATES_SRC_PATH = 'src/templates/';
var LESS_SRC_PATH = 'src/less/';
var JS_SRC_PATH = 'src/js/';

var IMAGE_DIST_PATH = DIST_PATH_ROOT + 'images/';
var SCRIPTS_DIST_PATH = DIST_PATH_ROOT;

var TEMPLATES_DIST_PATH = DIST_PATH_ROOT + 'templates/';
var CSS_DIST_PATH = DIST_PATH_ROOT;
var JS_DIST_PATH = DIST_PATH_ROOT + 'js/';

var WP_THEME_PATH  = 'wordpress/wp-content/themes/' + BUILD_NAME + '/';

// =========== END PATHS


var TEMPLATE_VM = { JS: {}, CSS: {} };

// =========== INDEX TASKS

gulp.task('clean-index', function () {
  return del([
    DIST_PATH_ROOT + 'index.php'
  ])
});

gulp.task('build-index', function () {
  return gulp.src(WORKING_DIRECTORY + 'index.php')
    .pipe(template(TEMPLATE_VM))
    .pipe(gulp.dest(DIST_PATH_ROOT));
});

// =========== END INDEX TASKS



// =========== TEMPLATE TASKS

gulp.task('clean-templates', function () {
  return del([
    TEMPLATES_DIST_PATH + '**/*.html',
    TEMPLATES_DIST_PATH
  ]);
});

gulp.task('build-templates', ['clean-templates'], function () {
  return gulp.src([
    WORKING_DIRECTORY + TEMPLATES_SRC_PATH + '**/*.html',
    WORKING_DIRECTORY + COMPONENTS_SRC_PATH + '**/*.html',
    WORKING_DIRECTORY + VIEWS_SRC_PATH + '**/*.html'
  ])
  .pipe(flatten())
  .pipe(gulp.dest(TEMPLATES_DIST_PATH))
});

// =========== END TEMPLATES TASKS

DIST_PATH_ROOT

// =========== IMAGE TASKS

gulp.task('clean-images', function () {
  return del([
    IMAGE_DIST_PATH + '**/*',
    IMAGE_DIST_PATH
  ]);
});

gulp.task('build-images', ['clean-images'], function () {
  return gulp.src(WORKING_DIRECTORY + IMAGE_SRC_PATH + '**/*')
    .pipe(gulp.dest(IMAGE_DIST_PATH));
});

// =========== END IMAGE TASKS



// =========== SCRIPT TASKS

gulp.task('clean-scripts', function () {
  return del([
    SCRIPTS_DIST_PATH + '**/*.php',
    '!' + SCRIPTS_DIST_PATH + 'index.php'
  ]);
});

gulp.task('build-scripts', ['clean-scripts'], function () {
  return gulp.src(WORKING_DIRECTORY + SCRIPTS_SRC_PATH + '**/*')
    .pipe(gulp.dest(SCRIPTS_DIST_PATH));
});

// =========== END SCRIPT TASKS



// =========== JS TASKS

gulp.task('clean-js', function () {
  return del([
    JS_DIST_PATH + '**/*.js',
    JS_DIST_PATH + '**'
  ])
});

gulp.task('build-js', ['clean-js'], function () {
  return es.merge(
    gulp.src(_.filter(bowerFiles(), function (file) {
        return _.endsWith(path.basename(file), '.js');
      }))
      .pipe(flatten())
      .pipe(bindOutput(TEMPLATE_VM.JS, 'LIBS'))
      .pipe(gulp.dest(JS_DIST_PATH)),

    gulp.src([
      WORKING_DIRECTORY + JS_SRC_PATH + '**/*.js',
      WORKING_DIRECTORY + COMPONENTS_SRC_PATH + '**/*.js',
      WORKING_DIRECTORY + VIEWS_SRC_PATH + '**/*.js'
    ])
      .pipe(angularify({
        root: 'app.js',
        module: 'mw.app',
        dependencies: [
          'ui.router',
          'ngAnimate',
          'ngScrollSpy'
        ]
      }))
      .pipe(browserify({
        insertGlobals : true,
        debug : !argv.prod
      }))
      .on('error', function (error) {
        console.log(error.toString());
        this.emit('end');
      })

      // Prod
      .pipe(gif(argv.prod, rename({ suffix: '.min' })))
      .pipe(gif(argv.prod, uglify()))
      // End Prod

      .pipe(gulp.dest(JS_DIST_PATH))
  )
});

// =========== END JS TASKS



// =========== CSS TASKS

gulp.task('clean-css', function () {
  return del([
    CSS_DIST_PATH + '**/*.css'
  ])
});

gulp.task('build-css', ['clean-css'], function () {
  return es.merge(
    gulp.src(_.filter(bowerFiles(), function (file) {
        return _.endsWith(path.basename(file), '.css');
      }))
      .pipe(flatten())
      .pipe(bindOutput(TEMPLATE_VM.CSS, 'LIBS'))
      .pipe(gulp.dest(CSS_DIST_PATH + "css/")),

    gulp.src(WORKING_DIRECTORY + LESS_SRC_PATH + 'app.less')
      .pipe(less({
        paths: [
          WORKING_DIRECTORY + LESS_SRC_PATH,
          WORKING_DIRECTORY + COMPONENTS_SRC_PATH,
          WORKING_DIRECTORY + VIEWS_SRC_PATH
        ]
      }))
      .on('error', function (error) {
        console.log(error.toString());
        this.emit('end');
      })
      .pipe(rename('style.css'))

      // Prod
      .pipe(gif(argv.prod, minifyCss()))
      // End Prod

      .pipe(gulp.dest(CSS_DIST_PATH))
  )
});

// =========== END CSS TASKS

gulp.task('clean-deploy', function () {
  return del([
    DEPLOY_PATH_ROOT + BUILD_NAME + '.zip'
  ]);
});

gulp.task('build-deploy', ['clean-deploy'], function () {
  return gulp.src(DIST_PATH_ROOT + '*/**')
    .pipe(zip(BUILD_NAME + '.zip'))
    .pipe(gulp.dest(DEPLOY_PATH_ROOT));
});

gulp.task('clean-link', function () {
  return del([
    WP_THEME_PATH
  ]);
});

gulp.task('build-link', ['clean-link'], function () {
  return gulp.src(DIST_PATH_ROOT)
    .pipe(symlink(WP_THEME_PATH));
});

gulp.task('clean-all', [
  'clean-js',
  'clean-css',
  'clean-images',
  'clean-scripts',
  'clean-templates'
], function () {
  return del([DIST_PATH_ROOT]);
});

gulp.task('build-all', function () {
  return sequence(
    [
      'build-js',
      'build-css',
      'build-images',
      'build-scripts',
      'build-templates'
    ],
    'build-index'
  );
});

gulp.task('build-app', ['build-all']);


gulp.task('watch-all', ['build-all'], function () {
  gulp.watch([
    WORKING_DIRECTORY + JS_SRC_PATH + '**/*.js',
    WORKING_DIRECTORY + COMPONENTS_SRC_PATH + '**/*.js',
    WORKING_DIRECTORY + VIEWS_SRC_PATH + '**/*.js'
  ], ['build-js']);

  gulp.watch([
    WORKING_DIRECTORY + LESS_SRC_PATH + '**/*.less',
    WORKING_DIRECTORY + COMPONENTS_SRC_PATH + '**/*.less',
    WORKING_DIRECTORY + VIEWS_SRC_PATH + '**/*.less'
  ], ['build-css']);

  gulp.watch([
    WORKING_DIRECTORY + TEMPLATES_SRC_PATH + '**/*.html',
    WORKING_DIRECTORY + COMPONENTS_SRC_PATH + '**/*.html',
    WORKING_DIRECTORY + VIEWS_SRC_PATH + '**/*.html'
  ], ['build-templates']);

  gulp.watch(WORKING_DIRECTORY + IMAGE_SRC_PATH + '**/*', ['build-images']);
  gulp.watch(WORKING_DIRECTORY + SCRIPTS_SRC_PATH + '**/*.php', ['build-scripts']);

  gulp.watch(WORKING_DIRECTORY + 'index.php', ['build-index']);
});

gulp.task('default', ['build-app', 'build-link', 'watch-all']);
gulp.task('build', ['build-app', 'build-link']);

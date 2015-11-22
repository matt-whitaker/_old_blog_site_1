"use strict";

// =========== DEPENDENCIES

var es          = require('event-stream');
var prettyJson  = require('prettyjson');
var through2    = require('through2');
var del         = require('del');
var _           = require('lodash');

// Gulp
var gulp        = require('gulp');
var flatten     = require('gulp-flatten');
var browserify  = require('gulp-browserify');
var rename      = require('gulp-rename');
var less        = require('gulp-less');
var template    = require('gulp-template');
var bowerFiles  = require('main-bower-files');
var symlink     = require('gulp-sym');

// =========== END DEPENDENCIES



// =========== ENVIRONMENT
var env = null;
try {
  env           = require('./env.json');

} catch (e) {}

var pkg         = require('./package.json');

// =========== END ENVIRONMENT



// =========== PATHS

var BUILD_NAME = 'disjointedthinking';
var WORKING_DIRECTORY = process.cwd() + '/';

var DIST_PATH_ROOT = 'dist/' + BUILD_NAME + '/';

var IMAGE_SRC_PATH = 'assets/images/';
var TEMPLATES_SRC_PATH = 'templates/';
var SCRIPTS_SRC_PATH = 'scripts/';
var CSS_SRC_PATH = 'src/less/';
var JS_SRC_PATH = 'src/js/';

var IMAGE_DIST_PATH = DIST_PATH_ROOT + 'images/';
var TEMPLATES_DIST_PATH = DIST_PATH_ROOT + 'templates/';
var SCRIPTS_DIST_PATH = DIST_PATH_ROOT;
var CSS_DIST_PATH = DIST_PATH_ROOT;
var JS_DIST_PATH = DIST_PATH_ROOT + 'js/';

var WP_THEME_PATH  = 'wordpress/wp-content/themes/' + BUILD_NAME + '/';

// =========== END PATHS



// =========== TEMPLATE TASKS

gulp.task('clean-templates', function () {
  return del([
    DIST_PATH_ROOT + '**/index.php',
    TEMPLATES_DIST_PATH + '**/*.html',
    TEMPLATES_DIST_PATH
  ]);
});

gulp.task('build-templates', ['clean-templates'], function () {
  return es.merge(
    gulp.src(WORKING_DIRECTORY + 'index.php')
      .pipe(template(pkg.build))
      .pipe(gulp.dest(DIST_PATH_ROOT)),

    gulp.src(WORKING_DIRECTORY + TEMPLATES_SRC_PATH + '**')
      .pipe(gulp.dest(TEMPLATES_DIST_PATH))
  );
});

// =========== END TEMPLATES TASKS



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
  var counter = 0;
  var files = bowerFiles();

  function jsFiles () {
    return through2.obj(function (file, encoding, cb) {
      if (_.endsWith(files[counter++], '.js')) {
        this.push(file);
      }

      cb();
    })
  }

  return es.merge(
    gulp.src(files)
      .pipe(jsFiles())
      .pipe(flatten())
      .pipe(gulp.dest(JS_DIST_PATH)),

    gulp.src(WORKING_DIRECTORY + JS_SRC_PATH + 'app.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : env && env.dev
      }))
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
  gulp.src(WORKING_DIRECTORY + CSS_SRC_PATH + 'app.less')
    .pipe(less({
      paths: [ WORKING_DIRECTORY + CSS_SRC_PATH ]
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(CSS_DIST_PATH));
});

// =========== END CSS TASKS


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

gulp.task('build-all', [
  'build-js',
  'build-css',
  'build-images',
  'build-scripts',
  'build-templates'
]);

gulp.task('watch-all', ['build-all'], function () {
  gulp.watch(WORKING_DIRECTORY + JS_SRC_PATH + '**/*.js', ['build-js']);
  gulp.watch(WORKING_DIRECTORY + CSS_SRC_PATH + '**/*.less', ['build-css']);
  gulp.watch(WORKING_DIRECTORY + IMAGE_SRC_PATH + '**/*', ['build-images']);
  gulp.watch(WORKING_DIRECTORY + SCRIPTS_SRC_PATH + '**/*.php', ['build-scripts']);
  gulp.watch([
    WORKING_DIRECTORY + TEMPLATES_SRC_PATH + '**/*',
    WORKING_DIRECTORY + 'index.php'
  ], ['build-templates']);
});

gulp.task('default', ['build-all', 'build-link', 'watch-all']);
'use strict';
var gulp = require('gulp');
var helper = require('./helper');
var del = require('del');
var $ = require('gulp-load-plugins')();
var config = require('./config');

/**
 * Remove all files from the build, temp and reports folders
 * @param {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var files = [].concat(
        config.temp,
        config.build,
        config.report
    );
    clean(files, done);
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.js',
        config.build + '**/*.html'
    );
    clean(files, done);
});

/**
 * Remove all css from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        config.temp + '**/*.css',
        config.build + '**/*.css'
    );
    clean(files, done);
});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
    clean([config.build + 'fonts/**/*.*'], done);
});


/**
 * Delete all files in a given path
 * @param {Array} path - array of paths to delete
 * @param {Function} done - callback when complete
 */
function clean(path, done) {
    helper.log('Cleaning:\n\t' + $.util.colors.magenta(path.join('\n\t')));
    del(path).then(function() { done(); });
}
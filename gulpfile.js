/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var walk = require('walk');
var $ = require('gulp-load-plugins')();

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
walk.walkSync('./gulp', { 
    filters: '*.js',
    listeners: {
        file: function (root, fileStats, next) {
            require('./gulp/' + fileStats.name);
            next();
        }
    }
});

// outdated wrench version
// var wrench = require('wrench');
// wrench.readdirSyncRecursive('./gulp').filter(function(file) {
//     return (/\.(js|coffee)$/i).test(file);
// }).map(function(file) {
//     require('./gulp/' + file);
// });

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

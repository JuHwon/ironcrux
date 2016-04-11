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
            console.log(fileStats.name);
            require('./gulp/' + fileStats.name);
            next();
        }
    }
})

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

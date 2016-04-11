'use strict';
var gulp = require('gulp');
var helper = require('./helper');
var del = require('del');
var $ = require('gulp-load-plugins')();
var config = require('./config');

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', ['optimize'], function() {   
    helper.log('Building everything');
    // var msg = {
    //     title: 'gulp build',
    //     subtitle: 'Deployed to the build folder',
    //     message: 'Running `gulp serve-build`'
    // };
    del(config.temp);
    //helper.log(msg);
    // $.notify(msg);
});

gulp.task('optimize', ['inject', 'tscompile', 'test'], function() {
    helper.log("The task `optimize` is not implemented yet.");
});


/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['build'], function() {
    helper.serve(true /*isDev*/);
});
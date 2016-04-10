'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var helper = require('./helper');

gulp.task('tscompile', ['tscompile-server', 'tscompile-client'], function() {});

/**
 * TypeScript Client
 */
var tsPathClient = config.client + './**/*.ts';

gulp.task('tscompile-client', ['tslint-client'], function() {
    var tsProject = $.typescript.createProject(config.client+'tsconfig.json');
    return gulp.src(tsPathClient)
        .pipe($.typescript(tsProject))
        .on('error', helper.errorHandler('TS Compile Client'));
});

gulp.task('tslint-client', function() {
    return gulp.src(tsPathClient)
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'))
        .on('error', helper.errorHandler('TS LINT Client'));
});

/**
 * TypeScript Server
 */
var tsPathServer = config.server + './**/*.ts';

gulp.task('tscompile-server', ['tslint-server'], function() {
    var tsProject = $.typescript.createProject(config.server+'tsconfig.json');
    return gulp.src(tsPathServer)
        .pipe($.typescript(tsProject))
        .on('error', helper.errorHandler('TS Compile Server'));
});

gulp.task('tslint-server', function() {
    return gulp.src(tsPathServer)
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'))
        .on('error', helper.errorHandler('TS LINT Server'));
});

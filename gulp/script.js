'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var helper = require('./helper');

gulp.task('tscompile', ['tscompile-server', 'tscompile-client']);

/**
 * TypeScript Client
 */
var tsPathClient = config.client + './**/*.ts';

gulp.task('tscompile-client', ['tslint-client'], function() {
    var tsProject = $.typescript.createProject(config.client+'tsconfig.json');
    var srcMapsOptions = {
        sourceRoot: function(file){ return file.cwd + '/' + config.client; }
    };
    return gulp.src(tsPathClient)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject))
        .on('error', helper.errorHandler('TS Compile Client'))
        .pipe($.sourcemaps.write('.', srcMapsOptions))
        .pipe(gulp.dest(config.client));
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
    var tsProject = $.typescript.createProject(config.server + 'tsconfig.json');
    var srcMapsOptions = {
        sourceRoot: function(file){ return file.cwd + '/' + config.server; }
    };
    return gulp.src(tsPathServer)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject))
        .on('error', helper.errorHandler('TS Compile Server'))
        .pipe($.sourcemaps.write('.', srcMapsOptions))
        .pipe(gulp.dest(config.server));
});

gulp.task('tslint-server', function() {
    return gulp.src(tsPathServer)
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'))
        .on('error', helper.errorHandler('TS LINT Server'));
});


// gulp.task('tslint-test', function() {
//     return gulp.src('./test/**/*.ts')
//         .pipe($.tslint())
//         .pipe($.tslint.report('verbose'))
//         .on('error', helper.errorHandler('TS LINT Client'));
// });

// gulp.task('tscompile-test', ['tslint-server'], function() {
//     var tsProject = $.typescript.createProject('./test/' + 'tsconfig.json');
//     var srcMapsOptions = {
//         sourceRoot: function(file){ return file.cwd + '/' + config.server; }
//     };
//     return gulp.src('./test/**/*.ts')
//         .pipe($.typescript(tsProject))
//         .on('error', helper.errorHandler('TS Compile Test'))
//         .pipe(gulp.dest('./test/'));
// });

'use strict';

var gulp = require('gulp');
var helper = require('./helper');
var $ = require('gulp-load-plugins')();
var config = require('./config');


gulp.task('styles', ['clean-styles'], function(done) {
    
    var sassOptions = {
        indentWidth: 4,
        outputStyle: 'expanded',
        errorLogToConsole: true
    };
    
    return gulp.src(config.allSass)
        .pipe($.concat('styles.scss'))
        .pipe($.plumber())
        .pipe($.sass(sassOptions))
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp));
        
});
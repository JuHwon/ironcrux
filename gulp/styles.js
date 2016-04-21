'use strict';

var gulp = require('gulp');
var helper = require('./helper');
var $ = require('gulp-load-plugins')();
var config = require('./config');


gulp.task('styles', ['clean-styles', 'fonts'], function(done) {
    helper.log('compiling all scss files');
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

gulp.task('fonts', function(done) {
    helper.log($.util.colors.blue('gulp task `fonts` not implemented yet'));
    done();
});
'use strict';

var gulp = require('gulp');
var config = require('./config');

gulp.task('watch', ['tscompile'], function() {
   
   gulp.watch(config.client + '**/*.ts', ['tscompile-client']);
   gulp.watch(config.server + '**/*.ts', ['tscompile-server']);
    
});
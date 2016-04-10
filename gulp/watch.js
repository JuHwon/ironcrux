'use strict';

var gulp = require('gulp');
var config = require('./config');

gulp.task('watch', ['tscompile'], function() {
   
   gulp.watch(config.allTs, ['tscompile']);
    
});
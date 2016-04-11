'use strict';

var gulp = require('gulp');
var helper = require('./helper');

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', ['tscompile', 'templatecache'], function(done) {
    //startTests(true /*singleRun*/ , done);
    helper.log("The task `test` is not implemented yet.");
    done(); // just for now
});
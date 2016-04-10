'use strict';

module.exports = (function() {
    var gulp = require('gulp');
    var notify = require('gulp-notify');
    var $ = require('gulp-load-plugins')();
    
    var obj = {};    
    
    function errorhandler(title) {

        return notify.onError({
            title: title + ' error(s)',
            message: '<%= error.message %>'
        });
    }
    obj.errorHandler = errorhandler;
    

    /**
     * Log a message or series of messages using chalk's blue color.
     * Can pass in a string, object or array.
     */
    function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }
    obj.log = log;
    
    return obj;
})();
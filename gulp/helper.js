'use strict';

module.exports = (function() {
    
    var notify = require('gulp-notify');
    
    var obj = {};    
    
    function errorhandler(title) {

        return notify.onError({
            title: title + ' error(s)',
            message: '<%= error.message %>'
        });
    }
    obj.errorHandler = errorhandler;
    
    return obj;
})();
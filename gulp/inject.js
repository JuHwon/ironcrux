var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var args = require('yargs').argv;
var config = require('./config');
var helper = require('./helper');

gulp.task('inject', ['inject-js'], function() {});

gulp.task('inject-js', function() {
    helper.log('Injecting JavaScript files into the html.');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    // Only include stubs if flag is enabled
    //var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;
    var js = config.clientJs;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(js, '', config.jsOrder))
        .pipe(gulp.dest(config.client));
});



/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array}  src   glob pattern for source files
 * @param   {String} label The label name
 * @param   {Array}  order glob pattern for sort order of the files
 * @returns {Stream} The stream
 */
function inject(src, label, order) {
    var options = { };
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array}  order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc (src, order) {
    //order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}
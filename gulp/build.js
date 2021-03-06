'use strict';
var gulp = require('gulp');
var helper = require('./helper');
var del = require('del');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var args = require('yargs').argv;

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', ['optimize', 'fonts'], function() {   
    helper.log('Building everything');
    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder'
    };
    del(config.temp);
    helper.log(msg);
    $.notify(msg);
});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize', ['inject', 'test'], function(done) {
    helper.log('Optimizing the js, css and html');
    
    var templatecache = config.temp + config.templateCache.file;
    
    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsAppFilter = $.filter('**/app.js', { restore: true });
    var jslibFilter = $.filter('**/lib.js', { restore: true });    
    
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(inject(templatecache, 'templates'))
        .pipe($.useref({ searchPath: './' }))
        
        //minify css
        .pipe(cssFilter)
        .pipe($.cleanCss({ keepSpecialComments: 0 }))
        .pipe(cssFilter.restore)
               
        //minify app js
        .pipe(jsAppFilter)      
        .pipe($.uglify())
        .pipe(getHeader())
        .pipe(jsAppFilter.restore)  
        
        //minify vendor js
        .pipe(jslibFilter)
        .pipe($.uglify())
        .pipe(jslibFilter.restore)
        
        //TODO: consider using gulp-rev-all here
        
        //output
        .pipe(gulp.dest(config.build));
        
});


gulp.task('build-specs', ['templatecache', 'tscompile'], function() {
    helper.log('Building the spec runner...');
    
    var wiredep = require('wiredep').stream;
    var templateCache = config.temp + config.templateCache.file;
    var options = config.getWiredepDefaultOptions();
    var specs = config.specs;
    
    helper.log($.util.colors.red("ServerIntegrationSpecs required???"));
    if(args.startServers) {
        specs = [].concat(specs, config.serverIntegrationSpecs)
    }
    options.devDependencies = true;
    
    return gulp
        .src(config.specRunner)
        .pipe(wiredep(options))
        .pipe(inject(config.clientJs, '', config.jsOrder))
        .pipe(inject(config.testlibraries, 'testlibraries'))
        .pipe(inject(config.specHelpers, 'spechelpers'))
        .pipe(inject(specs, 'specs', ['**/*']))
        .pipe(inject(templateCache, 'templates'))
        .pipe(gulp.dest(config.client));
});




gulp.task('inject', ['inject-js', 'styles', 'templatecache'], function() {
    helper.log('Injecting CSS files into html.');
    
    return gulp 
        .src(config.index)
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.client));        
});

gulp.task('inject-js', ['tscompile-client', 'templatecache'], function() {
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
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}


/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
    var pkg = require('../package.json');
    var template = ['/**',
                    ' * <%= pkg.name %> - <%= pkg.description %>',
                    ' * @authors <%= pkg.authors %>',
                    ' * @version v<%= pkg.version %>',
                    ' * @link <%= pkg.homepage %>',
                    //' * @license <%= pkg.license %>',
                    ' */',
                    ''
                   ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}



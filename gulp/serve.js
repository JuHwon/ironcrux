'use strict';
var gulp = require('gulp');
var helper = require('./helper');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var args = require('yargs').argv
var browserSync = require('browser-sync');

var port = process.env.PORT || config.defaultPort;

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['inject', 'tscompile-server', 'watch'], function() {
    serve(true /*isDev*/);
});

/**
 * serve the spec runner
 */
gulp.task('serve-specs',['build-specs', 'watch'], function() {
    helper.log('Running the spec runner...'); 
    serve(true, true);
});



/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev      - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */
function serve(isDev, specRunner) {
    var nodeOptions = getNodeOptions(isDev);

    if(isDev) {
        nodeOptions.nodeArgs = ['--debug=5858'];    
    }        

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
        .on('restart', [], function(ev) {
            helper.log('*** nodemon restarted');
            helper.log('files changed:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload();
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            helper.log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            helper.log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            helper.log('*** nodemon exited cleanly');
        });
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}           

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    helper.log('Starting BrowserSync on port ' + port);
    
    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches sass, compiles it to css, browser-sync handles reload
    if (isDev) {
        gulp
            .watch(config.allSass, ['styles'])
            .on('change', changeEvent);        
    } else {
        gulp
            .watch([].concat(config.allSass, config.clientJs, config.clientHtml),
                    ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.allSass,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'browserSync',
        notify: true,
        reloadDelay: 0 //1000
    } ;
    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);       
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    helper.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
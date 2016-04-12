'use strict';

module.exports = (function() {
    var gulp = require('gulp');
    var notify = require('gulp-notify');
    var args = require('yargs').argv
    var browserSync = require('browser-sync');
    var $ = require('gulp-load-plugins')();
    var config = require('./config');
    var port = process.env.PORT || config.defaultPort;
    
    var obj = {};    
    
    function errorhandler(title) {

        return notify.onError({
            title: title + ' error(s)',
            message: '<%= error.message %>'
        });
    }
    obj.errorHandler = errorhandler;
    
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
                log('*** nodemon restarted');
                log('files changed:\n' + ev);
                setTimeout(function() {
                    browserSync.notify('reloading now ...');
                    browserSync.reload();
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                log('*** nodemon started');
                startBrowserSync(isDev, specRunner);
            })
            .on('crash', function () {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                log('*** nodemon exited cleanly');
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
    obj.serve = serve;            
    
    /**
     * Start BrowserSync
     * --nosync will avoid browserSync
     */
    function startBrowserSync(isDev, specRunner) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting BrowserSync on port ' + port);
        
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
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }
    

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


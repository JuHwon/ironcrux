'use strict';

module.exports = (function() {

    var client = './src/client/';
    var server = './src/server/';
    var ngApp = client + 'app/';
    var temp = './.tmp/';
    var build = './build/';
    var report = './report/';
    var src = 'src/';

    var bower = {
        json: require('../bower.json'),
        directory: './bower_components/',
        ignorePath: './..'
    };

    var nodeModules = './node_modules/';

    var config = {
        client: client,
        server: server,
        temp: temp,
        build: build,
        report: report,
        index: client + 'index.html',
        source: src,

        css: temp + 'styles.css',

        allTs: [
            client + '**/*.ts',
            server + '**/*.ts'
        ],

        clientJs: [
            ngApp + '**/*.module.js',
            ngApp + '**/*.js',
            '!' + ngApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],

        allSass: [
            ngApp + 'var.scss',
            ngApp + 'app.scss',
            client + '**/*.scss',
            client + '*.scss'
        ],

        fonts: [
            bower.directory + 'font-awesome/fonts/**/*.*'
        ],

        clientHtml: [
            client + '**/*.html'
        ],
        htmltemplates: ngApp + '**/*.html',
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standalone: false
            }
        },

        bower: bower,

        nodeServer: server + 'app.js',
        defaultPort: '8001',

        /**
         * browser sync
         */
        browserReloadDelay: 1000, //1000

        /**
         * specs.html, our HTML spec runner
         */
        testlibraries: [
            nodeModules + 'mocha/mocha.js',
            nodeModules + 'chai/chai.js',
            nodeModules + 'sinon/pkg/sinon.js',
            nodeModules + 'mocha-clean/index.js',
            nodeModules + 'sinon-chai/lib/sinon-chai.js',
            nodeModules + 'babel-polyfill/browser.js'
        ],
        specRunner: client + 'specs.html',
        specRunnerFile: 'specs.html',
        specHelpers: [
            // client + 'test-helpers/*.js'
        ],
        specs: [ ngApp + '**/*.spec.js' ],
        serverIntegrationSpecs: [
            client + '/tests/server-integration/**/*.spec.js'
        ]
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = getWiredepDefaultOptions;

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    /////////////////////

    function getWiredepDefaultOptions() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    function getKarmaOptions() {
        var wiredep = require('wiredep');
        var bowerFiles = wiredep({ devDependencies: true })['js'];
        var options = {
            files: [].concat(
                bowerFiles,
                nodeModules + 'babel-polyfill/browser.js',
                client + 'test-helpers/*.js',
                ngApp + '**/*.module.js',
                ngApp + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' } //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[ngApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }

})();
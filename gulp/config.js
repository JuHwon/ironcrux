'use strict';

module.exports = (function() {
    
    var client = './src/client/';
    var server = './src/server/';
    var ngApp = client + 'app/';
    var temp = './.tmp/';
    
    var config = {
        client: client,
        server: server,
        temp: temp,
        index: client + 'index.html',
        
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
        
        clientHtml: [
            client + '**/*.html'
        ],       
        
        bower: {
            json: require('../bower.json'),
            directory: './bower_components/',
            ignorePath: './..'
        },
                
        nodeServer: server + 'app.js',
        defaultPort: '3001',
        
        /**
         * browser sync
         */
        browserReloadDelay: 1000,
        
        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + 'sepcs.html',
        specRunnerFile: 'sepcs.html'
    };
    
    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = getWiredepDefaultOptions;
    
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
    
})();
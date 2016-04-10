'use strict';

module.exports = (function() {
    
    var client = './src/client/';
    var server = './src/server/';
    var ngApp = client + 'app/';
    
    var config = {
        client: client,
        server: server,
        
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
        
        bower: {
            json: require('../bower.json'),
            directory: './bower_components/',
            ignorePath: './..'
        }
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
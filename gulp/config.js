'use strict';

module.exports = (function() {
    
    var client = './src/client/';
    var server = './src/server/';
    
    
    var config = {
        client: client,
        server: server,
        
        allTs: [
            client + '**/*.ts',
            server + '**/*.ts'
        ]
    };
    
    return config;
})();
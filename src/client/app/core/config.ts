namespace app.core {
    
    var config = {
        appErrorPrefix: ['ironcrux'],
        appTitle: 'ironcrux'
    };
    
    angular
        .module('app.core')
        .value('config', config);
}
namespace app.core {

    var core: angular.IModule = angular.module('app.core');

    var config = {
        appErrorPrefix: ['ironcrux'],
        appTitle: 'ironcrux'
    };

    core        
        .config(toastrConfig)
        .config(routerConfig)
        .value('config', config)
        .value('$routerRootComponent', 'shell');

    /////////////////////

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr: Toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    
    routerConfig.$inject = ['$locationProvider'];
    function routerConfig($locationProvider: ng.ILocationProvider) {
        $locationProvider.html5Mode(true);
    }

}
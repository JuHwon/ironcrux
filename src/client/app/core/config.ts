namespace app.core {

    var core: angular.IModule = angular.module('app.core');

    var config = {
        appErrorPrefix: ['ironcrux'],
        appTitle: 'ironcrux'
    };

    core
        .value('config', config)
        .config(toastrConfig);

    /////////////////////

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr: Toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

}
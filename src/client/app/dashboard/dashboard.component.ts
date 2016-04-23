namespace app.dashboard {
    'use strict';
    
    class Dashboard implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string = 'app/dashboard/dashboard.html';
        public controllerAs: string = 'vm';        
                
    }
    
    angular
        .module('app.dashboard')
        .component('dashboard', new Dashboard());
}
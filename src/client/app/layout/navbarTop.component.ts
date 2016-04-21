namespace app.layout {
    'use strict';
    
    class NavbarTop implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string = 'app/layout/navbarTop.html';
        public controllerAs: string = 'vm';        
                
    }
    
    angular
        .module('app.layout')
        .component('navbarTop', new NavbarTop());
}
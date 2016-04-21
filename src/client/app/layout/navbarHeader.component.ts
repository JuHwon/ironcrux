namespace app.layout {
    'use strict';
    
    class NavbarHeader implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public controllerAs: string;    
        public templateUrl: string;
        
        constructor() {
            this.bindings = {
                title: '@',
                toggleTarget: '@'
            };
            this.controllerAs = 'vm';
            this.templateUrl = 'app/layout/navbarHeader.html';

        }        
    }
    
    angular
        .module('app.layout')
        .component('navbarHeader', new NavbarHeader());
}
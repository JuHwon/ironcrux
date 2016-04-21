namespace app.layout {
    'use strict';
    
    class NavbarSide implements ng.IComponentOptions {        
        public controller: any;
        public templateUrl: string = 'app/layout/navbarSide.html';
        public controllerAs: string = 'vm';        
        
        public bindings: any = {
            toggleClass: '@'  
        };
                
    }
    
    angular
        .module('app.layout')
        .component('navbarSide', new NavbarSide());
}
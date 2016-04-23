namespace app.layout {
    'use strict';
    
    class NavbarSideConrtoller {
        
        static $inject: Array<string> = ['$'];
        constructor(private $: any) {
            $('#side-menu').metisMenu();
        }
    }
    
    class NavbarSide implements ng.IComponentOptions {        
        public controller: any = NavbarSideConrtoller;
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
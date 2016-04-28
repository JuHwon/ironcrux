namespace app.layout {
    'use strict';
    
    import ngr = common.router;
    
    export class NavbarSideConrtoller {
        
        public routes: Array<ngr.IAppRouteDefinition>;
                
        static $inject: Array<string> = ['$', 'RouterHelper'];
        constructor(private $: any, routerHelper: ngr.IRouterService) {
            $('#side-menu').metisMenu();
            this.routes = routerHelper.routes;
        }
    }
    
    angular
        .module('app.layout')
        .controller('NavbarSideConrtoller', NavbarSideConrtoller);
    
    class NavbarSide implements ng.IComponentOptions {        
        public controller: any = 'NavbarSideConrtoller';
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
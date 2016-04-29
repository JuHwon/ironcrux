namespace app.layout {
    'use strict';
    
    import ngr = common.router;
    
    export class NavbarSideConrtoller {        
        public routes: Array<ngr.IAppRouteDefinition>;
                
        static $inject: Array<string> = ['$', 'RouterHelper'];
        constructor(private $: any, routerHelper: ngr.IRouterService) {            
            this.routes = routerHelper.routes;
            setTimeout(() => {
                $('#side-menu').metisMenu();
            });
            //TODO:  trigger metisMenu call after ng-repeat (menu build up)                        
        }
    }
    
    angular
        .module('app.layout')
        .controller('NavbarSideConrtoller', NavbarSideConrtoller);
    
    interface INavbarSideScope {
        //class to toggle side navigation
        toggleClass: string;
    }
    
    /**
     * NavbarSide Directive
     * Changed this to a directive because of 
     * the attempt to call metisMenu() after the routes are rendered
     */
    class NavbarSide implements ng.IDirective {
        constructor() { }
        
        static factory() : ng.IDirectiveFactory {
            var directive = () => 
                new NavbarSide();
            directive.$inject = [];
            return directive;                       
        }        
                
        public bindToController: boolean = true;
        public controller: any = NavbarSideConrtoller;
        public templateUrl: string = 'app/layout/navbarSide.html';
        public controllerAs: string = 'vm'; 
        public restrict: string = 'E';  
        
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;         
        
        public scope: INavbarSideScope = {
            //class to toggle side navigation
            toggleClass: '@'  
        };                         
    }
    
    angular
        .module('app.layout')
        .directive('navbarSide', NavbarSide.factory());    
}
namespace app.layout {
    'use strict';
    
    class Shell implements ng.IComponentOptions {
        public bindings: any;
        public controller: any = ShellController;
        public templateUrl: string = 'app/layout/shell.html';
        public controllerAs: string = 'vm';  
        
        public $routeConfig: Array<ng.RouteDefinition> = [
            { path: '/', name:'Dashboard', component: 'dashboard', useAsDefault: true }
        ];
                
    }
    
    angular
        .module('app.layout')
        .component('shell', new Shell());
}
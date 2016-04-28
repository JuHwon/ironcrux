namespace common.router {
    'use strict';
    
    export interface IAppRouteDefinition extends ng.RouteDefinition {
        class?: string;
    }

    export interface IRouterService {
        routes: Array<IAppRouteDefinition>;
    }
    
    export interface IRouterServiceProvider extends ng.IServiceProvider {        
        register(routes: Array<IAppRouteDefinition>): void;
    }
    
    export class RouterHelperProvider implements IRouterServiceProvider {  
        constructor() {                        
            this.$get.$inject = ['$rootRouter'];            
        }
        
        private routes: Array<IAppRouteDefinition> = [];
        
        public register(routes: Array<IAppRouteDefinition>) : void {
            this.routes = this.routes.concat(routes);
        }
                        
        public $get($rootRouter: ng.Router): IRouterService {
            $rootRouter.config(this.routes);
            return {
                routes: this.routes
            };
        }                

    }

    angular
        .module('common.router')
        .provider('RouterHelper', RouterHelperProvider);
}
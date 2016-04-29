namespace common.router {
    'use strict';
    
    export interface IAppRouteDefinition extends ng.RouteDefinition {
        class?: string;
        childs?: Array<IAppRouteDefinition>;
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
        private componentRoutes: Array<ng.RouteDefinition> = [];
        
        public register(routes: Array<IAppRouteDefinition>) : void {            
            routes.forEach(route => {
                if (!route.childs || !route.childs.length) {
                    this.componentRoutes.push(route); 
                } else {
                    route.path = '#';
                    this.componentRoutes = this.componentRoutes.concat(route.childs);
                }
            });  
            this.routes = this.routes.concat(routes);         
        }
                        
        public $get($rootRouter: ng.Router): IRouterService {
            $rootRouter.config(this.componentRoutes);
            return {
                routes: this.routes
            };
        }                

    }

    angular
        .module('common.router')
        .provider('RouterHelper', RouterHelperProvider);
}
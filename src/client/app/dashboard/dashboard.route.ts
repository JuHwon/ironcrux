namespace app.dashboard {
  'use strict';

  import ngr = common.router;

  angular.module('app.dashboard')
    .config(configureStates);

  configureStates.$inject = ['RouterHelperProvider'];
  function configureStates(RouterHelperProvider: ngr.IRouterServiceProvider) {
    var states = getStates();
    RouterHelperProvider.register(getStates());
  }

  function getStates(): Array<ngr.IAppRouteDefinition> {
    return [
      {
        path: '/',
        name:'Dashboard',
        component: 'dashboard',
        useAsDefault: true,
        class: 'fa-dashboard'
      }
    ];
  }
}
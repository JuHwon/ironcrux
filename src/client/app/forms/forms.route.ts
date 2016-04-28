
namespace app.forms {
  'use strict';
  
  import ngr = common.router;

  angular
    .module('app.forms')
    .config(configureStates);

  configureStates.$inject = ['RouterHelperProvider'];
  function configureStates(RouterHelper: ngr.IRouterServiceProvider) {
    var states = getStates();
    RouterHelper.register(getStates());
  }

  function getStates(): Array<ngr.IAppRouteDefinition> {
    return [
      {
        path: '/forms', 
        name:'Forms', 
        component: 'forms',
        class: 'fa-edit'
      }
    ];
  }
}
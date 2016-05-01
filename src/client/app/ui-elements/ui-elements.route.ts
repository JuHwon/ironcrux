
namespace app.forms {
  'use strict';

  import ngr = common.router;

  angular
    .module('app.uiElements')
    .config(configureStates);

  configureStates.$inject = ['RouterHelperProvider'];
  function configureStates(RouterHelper: ngr.IRouterServiceProvider) {
    var states = getStates();
    RouterHelper.register(getStates());
  }

  function getStates(): Array<ngr.IAppRouteDefinition> {
    return [
        {
            name: 'UI Elements',
            class: 'fa-wrench',
            childs: [
                {
                    path: '/panels',
                    name: 'Panels and Wells',
                    component: 'panels'
                }, {
                    path: '/buttons',
                    name: 'Buttons',
                    component: 'buttons'
                }
            ]

        }
    ];
  }
}
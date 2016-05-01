namespace app.uiElements {
    'use strict';

    class Panels implements ng.IComponentOptions {
        public controller: any;
        public templateUrl: string = 'app/ui-elements/panels/panels.html';
        public controllerAs: string = 'vm';

    }

    angular
        .module('app.uiElements')
        .component('panels', new Panels());
}
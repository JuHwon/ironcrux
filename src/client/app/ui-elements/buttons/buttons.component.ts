namespace app.uiElements {
    'use strict';
    
    class Buttons implements ng.IComponentOptions {
        public controller: any;
        public templateUrl: string = 'app/ui-elements/buttons/buttons.html';
        public controllerAs: string = 'vm';
                
    }
    
    angular
        .module('app.uiElements')
        .component('buttons', new Buttons());
}
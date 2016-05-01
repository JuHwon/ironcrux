namespace app.forms {
    'use strict';

    class Forms implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string = 'app/forms/forms.html';
        public controllerAs: string = 'vm';

    }

    angular
        .module('app.forms')
        .component('forms', new Forms());
}
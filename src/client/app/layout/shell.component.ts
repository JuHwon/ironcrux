namespace app.layout {
    'use strict';

    class Shell implements ng.IComponentOptions {
        static $inject: Array<string> = ['RouterHelper'];

        public controller: any = ShellController;
        public templateUrl: string = 'app/layout/shell.html';
        public controllerAs: string = 'vm';
        public bindings: any;

    }

    angular
        .module('app.layout')
        .component('shell', new Shell());
}
namespace app.layout {
    'use strict';

    export class ShellController {
        static $inject: Array<string> = ['$rootScope', '$timeout', 'config', 'logger'];
        constructor(private $rootScope: any,
            private $timeout: ng.ITimeoutService,
            private config: { appTitle: string },
            private logger: common.logger.ILogger) {
            this.logger.success(`${config.appTitle} loaded!`);
            this.hideSplash();
        }

        busyMessage = 'Please wait...';
        isBusy = true;

        hideSplash() {
            this.$timeout(() => { this.$rootScope.hideSlpash = true; }, 1000);
        }

    }

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
}
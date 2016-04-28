namespace app.layout {
    'use strict';

    export class ShellController {
        public appTitle: string;
        
        static $inject: Array<string> = ['$', '$rootScope', '$timeout', 'config', 'logger'];        
        constructor(private $: JQueryStatic,
            private $rootScope: any,
            private $timeout: ng.ITimeoutService,
            private config: { appTitle: string },
            private logger: common.logger.ILogger
            ) {                  
            this.appTitle = config.appTitle;    
            $rootScope.appTitle = this.appTitle; 
            this.hideSplash();
            this.setSizes($);
            this.logger.success(`${config.appTitle} loaded!`);

        }
        
        busyMessage = 'Please wait...';
        isBusy = true;

        hideSplash() {
            this.$timeout(() => { this.$rootScope.hideSlpash = true; }, 1000);
        }
        
        setSizes($: any) {
            var topOffset = 50;
            var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
            height = height - topOffset;
            if (height < 1) {
                height = 1;
            }
            if (height > topOffset) {
                $('#page-wrapper').css('min-height', (height) + 'px');
            }
        }

    }

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
}
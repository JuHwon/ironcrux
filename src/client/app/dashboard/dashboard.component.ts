namespace app.dashboard {
    'use strict';

    class DashboardController {
        static $inject: Array<string> = [];
        constructor() { }

        public data: Array<any> = [
            { y: '2006', a: 100, b: 90 },
            { y: '2007', a: 75, b: 65 },
            { y: '2008', a: 50, b: 40 },
            { y: '2009', a: 75, b: 65 },
            { y: '2010', a: 50, b: 40 },
            { y: '2011', a: 75, b: 65 },
            { y: '2012', a: 100, b: 90 }
        ];
        
        public donutData: Array<any> = [
            { label: 'Download Sales', value: 12 }, 
            { label: 'In-Store Sales', value: 30 }, 
            { label: 'Mail-Order Sales', value: 20 }
        ];
    }

    class Dashboard implements ng.IComponentOptions {
        public bindings: any;
        public controller: any = DashboardController;
        public templateUrl: string = 'app/dashboard/dashboard.html';
        public controllerAs: string = 'vm';

    }

    angular
        .module('app.dashboard')
        .component('dashboard', new Dashboard());
}
var expect = chai.expect;

var $rootScope: angular.IRootScopeService;
var $componentController: ng.IComponentControllerService;

describe('Dashboard', () => {

    beforeEach(() => {
        bard.appModule('app.dashboard', bard.fakeToastr);
        bard.inject(this, '$componentController', '$rootScope');
    });

    it('shold be ok', () => {
        expect($componentController('dashboard', { $scope: $rootScope.$new() })).to.be.ok;
    });
});
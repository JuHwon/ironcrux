var expect = chai.expect;

var $rootScope: angular.IRootScopeService;
var $componentController: ng.IComponentControllerService;

describe('Dashboard', () => {

    beforeEach(() => {
        bard.appModule('app.dashboard', bard.fakeToastr);
        bard.inject(this, '$componentController');
    });

    it('shold be ok', () => {
        expect($componentController('dashboard', null)).to.be.ok;
    });
});
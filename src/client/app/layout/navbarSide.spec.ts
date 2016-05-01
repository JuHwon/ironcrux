var expect = chai.expect;

var $controller: angular.IControllerService;
var $rootScope: angular.IRootScopeService;

describe('NavbarSideController', function() {
    var controller: app.layout.NavbarSideConrtoller;

    beforeEach(() => {
        bard.appModule('app.layout', bard.fakeToastr);
        bard.inject(this, '$controller', '$rootScope');
    });

    beforeEach(() => {
        var $scope = $rootScope.$new();
        controller = <app.layout.NavbarSideConrtoller> $controller('NavbarSideConrtoller', {$scope: $scope});
        $rootScope.$apply();
    });

    it('should be defined', () => {
        expect(controller).to.be.ok;
    });

    it('should have scope variable routes', () => {
       expect(controller.routes).to.be.ok;
    });

});


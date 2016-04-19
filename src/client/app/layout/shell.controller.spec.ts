var expect = chai.expect;

var controller: app.layout.ShellController;
var $controller: angular.IControllerService;
var $rootScope: angular.IRootScopeService;
var $timeout: angular.ITimeoutService;  

describe('ShellController', function() {
     
    beforeEach(() => {
        bard.appModule('app.layout', bard.fakeToastr);
        bard.inject(this, '$controller', '$rootScope', '$timeout');
    });    
    
    beforeEach(() => {
        var $scope = $rootScope.$new();        
        controller = <app.layout.ShellController>$controller('ShellController', {$scope: $scope});
        $rootScope.$apply();
    });
    
    it('should be defined', () => {
        expect(controller).to.be.ok;
    });
    
    it('should show splash screen', function () {
        expect($rootScope['hideSlpash']).to.be.not.ok;
    });

    it('should hide splash screen after timeout', function (done) {
        $timeout(function() {
            expect($rootScope['hideSlpash']).to.be.true;
            done();
        }, 1000);
        $timeout.flush();
    });
});


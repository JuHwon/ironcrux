var expect = chai.expect;

describe('ShellController', function() {
    var controller: app.layout.ShellController;
    var $controller: angular.IControllerService;
    var $rootScope: angular.IRootScopeService;
    var $timeout: angular.ITimeoutService;   

    // beforeEach(function() {
    //     bard.appModule('app.layout', bard.fakeToastr);
    //     bard.inject(this, '$controller', '$rootScope', '$timeout');
    // });

    beforeEach(() => {
        bard.appModule('app.layout', bard.fakeToastr);
        inject((_$rootScope_: angular.IRootScopeService,
        _$controller_: angular.IControllerService,
        _$timeout_: angular.ITimeoutService) => {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;           
        });       
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
        expect($rootScope['hideSlpash']).not.to.be.true;
    });

    it('should hide splash screen after timeout', function (done) {
        $timeout(function() {
            expect($rootScope['hideSlpash']).to.be.true;
            done();
        }, 1000);
        $timeout.flush();
    });
});


var expect = chai.expect;

var $controller: angular.IControllerService;
var $rootScope: angular.IRootScopeService;
var $timeout: angular.ITimeoutService;  
var config: any;

describe('ShellController', function() {
    var shellController: app.layout.ShellController;
     
    beforeEach(() => {
        bard.appModule('app.layout', bard.fakeToastr);
        bard.inject(this, '$controller', '$rootScope', '$timeout', 'config');
    });    
    
    beforeEach(() => {
        var $scope = $rootScope.$new();        
        shellController = <app.layout.ShellController>$controller('ShellController', {$scope: $scope});
        $rootScope.$apply();
    });
    
    it('should be defined', () => {
        expect(shellController).to.be.ok;
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
    
    it('should have appTitle set', () => {
        expect(shellController.appTitle).to.be.eq(config.appTitle); 
    });
    
    it('should have set appTitle to $rootScpope', () => {
       expect($rootScope['appTitle']).to.be.eq(config.appTitle); 
    });
});


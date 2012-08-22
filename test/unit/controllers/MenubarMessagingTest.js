'use strict';

describe('MenubarMessagingTest', function(){
    var scope, ctrl;
    
    beforeEach(module('codeEdit.services'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller(NavbarMessagingCtrl, {$scope: scope});
    }));

    it('should broadcast ASK_TO_COMPILE with null param', inject(function(sharedService) {
        scope.compileBtnClick();
        expect(sharedService.message).toBe(sharedService.ASK_TO_COMPILE);
        expect(sharedService.param).toBeNull();
    }));

    it('should broadcast ASK_TO_EXECUTE with null param', inject(function(sharedService) {
        scope.executeBtnClick();
        expect(sharedService.message).toBe(sharedService.ASK_TO_EXECUTE);
        expect(sharedService.param).toBeNull();
    }));
});

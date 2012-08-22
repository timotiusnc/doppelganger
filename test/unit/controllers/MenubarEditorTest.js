'use strict';

describe('MenubarEditorTest', function(){
    var scope, ctrl;
    
    beforeEach(module('codeEdit.services'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller(NavbarCtrl, {$scope: scope});
    }));

    it('should broadcast REQUEST_SAVE_FILE with false param', inject(function(sharedService) {
        scope.saveFileBtnClick();
        expect(sharedService.message).toBe(sharedService.REQUEST_SAVE_FILE);
        expect(sharedService.param).toBe(false);
    }));

    it('should broadcast REQUEST_SAVE_FILE with true param', inject(function(sharedService) {
        scope.saveFileAsBtnClick();
        expect(sharedService.message).toBe(sharedService.REQUEST_SAVE_FILE);
        expect(sharedService.param).toBe(true);
    }));

    it('should broadcast NEW_TAB_BTN_CLICKED with mixed param', inject(function(sharedService) {
        scope.addNewTabBtnClick();
        expect(sharedService.message).toBe(sharedService.NEW_TAB_BTN_CLICKED);
        expect(sharedService.param.title).toBe('');
        expect(sharedService.param.content).toBe('');
    }));
});

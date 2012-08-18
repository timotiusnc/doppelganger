'use strict';

describe('sharedServiceTest', function(){
    beforeEach(module('codeEdit.services'));
    
    it('should have HANDLE_BROADCAST property with value "handleBroadcast"', inject(function(sharedService) {
        expect(sharedService.HANDLE_BROADCAST).toBe('handleBroadcast');
    }));
});

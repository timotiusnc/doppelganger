'use strict';

describe('CodeEditorTest', function(){
    it('should create "dummy" model with value "YEAH"', function() {
        var scope = {},
        ctrl = new CodeEditorCtrl(scope);

        expect(scope.dummy).toBe('YEAH');
    });
});

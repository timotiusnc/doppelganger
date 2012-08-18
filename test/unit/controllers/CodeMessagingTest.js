'use strict';

describe('CodeMessagingTest', function(){
    var scope, ctrl;

    beforeEach(module('codeEdit.services'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller(CodeMessagingCtrl, {$scope: scope});
    }));
    beforeEach(function(){
        localStorage.clear();   //Clear localStorage
        var file = {            //create dummy file
            fileName: 'test',
            content: 'test file content',
            previewContent: 'test file content',
            duration: 10,
            backspace_ctr:0,
            dir_ctr:0,
            keypress_ctr:10,
            mouseclick_ctr:1,
            timer:1
        }

        localStorage['test'] = JSON.stringify(file);
    });

    it('should initialize "files" model with name "test" and other attributes', function() {
        //jstestdriver.console.log(scope.files[key].fileName);
        expect(scope.files['test'].fileName).toBe('test');
        expect(scope.files['test'].content).toBe('test file content');
        expect(scope.files['test'].duration).toBe(10);
    });
});

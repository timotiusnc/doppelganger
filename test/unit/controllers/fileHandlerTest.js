'use strict';

describe('fileHandlerTest', function(){
    beforeEach(module('codeEdit.services'));
    beforeEach(inject(function(fileHandler){
        fileHandler.createNewFile('HelloWorld');
    }));

    afterEach(inject(function(fileHandler){
        fileHandler.stopTimer('HelloWorld');
        fileHandler.deleteFileFromMemory('HelloWorld');
        jstestdriver.console.log('after');
    }));
    
    it('should create new file with name "HelloWorld"', inject(function(fileHandler) {
        expect(fileHandler.files['HelloWorld'].fileName).toBe('HelloWorld');
        expect(fileHandler.files['HelloWorld'].content).toBe('');
        expect(fileHandler.files['HelloWorld'].previewContent).toBe('');
        expect(fileHandler.files['HelloWorld'].duration).toBeDefined(); //karena bisa lebih >0 tergantung lama unit testing
        expect(fileHandler.files['HelloWorld'].backspace_ctr).toBe(0);
        expect(fileHandler.files['HelloWorld'].dir_ctr).toBe(0);
        expect(fileHandler.files['HelloWorld'].keypress_ctr).toBe(0);
        expect(fileHandler.files['HelloWorld'].mouseclick_ctr).toBe(0);
        expect(fileHandler.files['HelloWorld'].timer).toBeDefined();
    }));

    it('should increment *_ctr with 1', inject(function(fileHandler) {
        fileHandler.incrementCtr('HelloWorld', {backspace_ctr: 1, dir_ctr:1, keypress_ctr:1});
        expect(fileHandler.files['HelloWorld'].backspace_ctr).toBe(1);
        expect(fileHandler.files['HelloWorld'].dir_ctr).toBe(1);
        expect(fileHandler.files['HelloWorld'].keypress_ctr).toBe(1);
    }));

    it('should update file content with "aku adalah anak gembala"', inject(function(fileHandler) {
        fileHandler.updateFileAttr('HelloWorld', {content: "aku adalah anak gembala"});
        expect(fileHandler.files['HelloWorld'].content).toBe("aku adalah anak gembala");
    }));

    it('should change file name "HelloWorld" to "HaloDunia"', inject(function(fileHandler) {
        fileHandler.changeFileName('HelloWorld', 'HaloDunia');
        expect(fileHandler.files['HelloWorld']).toBeUndefined();
        expect(fileHandler.files['HaloDunia'].fileName).toBe("HaloDunia");
    }));

    it('should save file to local storage and retrieved back', inject(function(fileHandler) {
        fileHandler.saveFileToLocalStorage('HelloWorld');
        var dummy = fileHandler.getFileFromLocalStorage('HelloWorld');
        
        expect(dummy.fileName).toBe('HelloWorld');
        expect(dummy.content).toBe('');
    }));
});

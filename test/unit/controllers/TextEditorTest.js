'use strict';

describe('TextEditorTest', function(){
    var scope, ctrl;
    
    beforeEach(module('codeEdit.services'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller(TabbedPaneCtrl, {$scope: scope});

        //initialize dummy variable
        scope.items.push(
        {
            tabTitle: 'untitled-0',
            tabInitialContent: 'dummy content 0',
            selected: true
        },
        {
            tabTitle: 'untitled-1',
            tabInitialContent: 'dummy content 1',
            selected: false
        });
    }));

    it('should get selected tab title and initial content', inject(function(sharedService) {
        var retval = scope.getSelectedTab();
        expect(retval.tabTitle).toBe('untitled-0');
        expect(retval.tabInitialContent).toBe('dummy content 0');
    }));
});

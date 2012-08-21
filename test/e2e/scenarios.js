'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('DoppelGanger', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.php');
  });


  it('should automatically redirect to /code-editor when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/code-editor");
  });


  describe('codeEditor', function() {

    beforeEach(function() {
      browser().navigateTo('#/code-editor');
    });


    it('should render code-editor when user navigates to /code-editor', function() {
        expect(element("#timer").text()).toMatch(/Timer: -- seconds/);
    });

    it('should open new tab and the name contains string "untitled-0"', function(){
        element("#addNewTab").click();
        expect(repeater("#myTab li").count()).toBe(1);
        expect(element("#myTab li :nth-child(1)").text()).toMatch(/untitled-0/);

        //pause();
        //input("untitled-0").enter('a');
        //pause();
    });
  });


  describe('codeMessaging', function() {

    beforeEach(function() {
      browser().navigateTo('#/code-messaging');
    });


    /*it('should render view1 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });*/

    it('should insert username "tes_username"', function(){
        //pause();
        input("username").enter('tes_username');
        pause();
    });
  });
});

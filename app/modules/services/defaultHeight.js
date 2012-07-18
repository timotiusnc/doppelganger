angular.module('codeEdit.services').
    factory('defaultHeight', function($rootScope){
    var defaultHeight = {};
    var navbar = $('.navbar');

    defaultHeight.DEFAULT_NAVBAR_MB = 18;
    defaultHeight.FOOTER_HEIGHT     = 50; //was 70

    defaultHeight.getOccupiedHeight = function(){
        var retval = navbar.height()
            + (6+26)    //footer text + its padding
            + 5         //margin-top footer
            + 50        //marign-top 50px
            + (25*2)    //Tab height, look at bootstrap.js line 3315-3318, *2 cause there are two main tabs
            + defaultHeight.FOOTER_HEIGHT;  //footer_tab height, was 130

        return retval;
    }

    return defaultHeight;
});

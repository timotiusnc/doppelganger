angular.module('codeEdit.services').
    factory('defaultHeight', function(){
    var defaultHeight = {};

    defaultHeight.MINIMUM_HEIGHT    = 500;
    defaultHeight.DEFAULT_NAVBAR_MB = 18;   //navbar margin-bottom
    defaultHeight.FOOTER_HEIGHT     = 50;   //was 50, was 70

    defaultHeight.getOccupiedHeight = function(){
        var retval = 6  //#footer_text + its padding, was 6+28
            + 0         //margin-top footer, was 5
            + 50        //marign-top 50px
            + (26)      //Tab height, look at bootstrap.js line 3315-3318, was *2 cause there are two main tabs
            + 0         //footer_tab height, was defaultHeight.FOOTER_HEIGHT
            + (defaultHeight.DEFAULT_NAVBAR_MB*2);

        return retval;
    }

    return defaultHeight;
});

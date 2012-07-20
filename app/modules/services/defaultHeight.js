angular.module('codeEdit.services').
    factory('defaultHeight', function($rootScope){
    var defaultHeight = {};

    defaultHeight.MINIMUM_HEIGHT    = 500;
    defaultHeight.DEFAULT_NAVBAR_MB = 18;   //navbar margin-bottom
    defaultHeight.FOOTER_HEIGHT     = 50;   //was 70

    defaultHeight.getOccupiedHeight = function(){
        var retval = (6+28)    //#footer_text + its padding
            + 5         //margin-top footer
            + 50        //marign-top 50px
            + (26*2)    //Tab height, look at bootstrap.js line 3315-3318, *2 cause there are two main tabs
            + defaultHeight.FOOTER_HEIGHT       //footer_tab height, was 130
            + (defaultHeight.DEFAULT_NAVBAR_MB*2);

        return retval;
    }

    return defaultHeight;
});

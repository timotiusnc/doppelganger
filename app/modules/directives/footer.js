/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditFooter', function(defaultHeight){
        return {
            replace: true,
            templateUrl: 'partials/templates/footer.html',
            transclude: true,
            scope: true,
            controller: FooterCtrl,
            link: function(scope, element, attrs){
                $(".footer_textarea").css('height', defaultHeight.FOOTER_HEIGHT+'px');

                $(window).resize(function() {
                    var navbar_mb = $(".navbar").css("margin-bottom");
                    if(navbar_mb == defaultHeight.DEFAULT_NAVBAR_MB+'px'){
                        $(".footer_textarea").css('height', (defaultHeight.FOOTER_HEIGHT - defaultHeight.DEFAULT_NAVBAR_MB)+'px');
                    }else{
                        $(".footer_textarea").css('height', defaultHeight.FOOTER_HEIGHT+'px');
                    }
                });
                $("#footer_tab a[href='#input']").tab('show');
            }
        }
    });

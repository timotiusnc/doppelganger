/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditFooter', function(footer_height, default_navbar_mb){
        return {
            replace: true,
            templateUrl: 'partials/templates/footer.html',
            transclude: true,
            scope: true,
            controller: FooterCtrl,
            link: function(scope, element, attrs){
                $(".footer_textarea").css('height', footer_height+'px');

                $(window).resize(function() {
                    var navbar_mb = $(".navbar").css("margin-bottom");
                    if(navbar_mb == default_navbar_mb+'px'){
                        $(".footer_textarea").css('height', (footer_height - default_navbar_mb)+'px');
                    }else{
                        $(".footer_textarea").css('height', footer_height+'px');
                    }
                });
                $("#footer_tab a[href='#input']").tab('show');
            }
        }
    });

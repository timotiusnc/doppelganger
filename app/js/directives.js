'use strict';

/* Directives */


angular.module('codeEdit.directives').
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }]).
    directive('zippy', function(){
        return {
            restrict: 'C',
            replace: true,
            transclude: true,
            scope: {zippyTitle:'bind'},
            templateUrl: 'partials/tes.html',
            link: function(scope, element, attrs){
                var title = angular.element(element.children()[0]),
                    opened = true;

                title.bind('click', toggle);

                function toggle(){
                    opened = !opened;
                    element.removeClass(opened ? 'closed' : 'opened');
                    element.addClass(opened ? 'opened' : 'closed');
                }

                toggle();
            }
        }
    }).
    directive('tabbedPane',function() {
        return {
            replace: true,
            templateUrl: 'partials/templates/tabbed_pane.html',
            link: function(scope, element, attrs){
                element.tabs();
            }
        }
    });

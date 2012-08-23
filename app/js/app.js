/**
 * @name Application level module
 * @description Declare app level module which depends on filters, directives, and services
 */

'use strict';

angular.module('codeEdit.services', []);    //to include all service modules in separated files
angular.module('codeEdit.directives', []);  //to include all directives modules in separated files

angular.module('codeEdit', ['codeEdit.filters', 'codeEdit.services', 'codeEdit.directives']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/code-editor', {templateUrl: 'partials/partial1.html', controller: CodeEditorCtrl});
        $routeProvider.when('/code-messaging', {templateUrl: 'partials/partial2.html', controller: CodeMessagingCtrl});
        $routeProvider.otherwise({redirectTo: '/code-editor'});
    }]).
    run(function($rootScope){ //App initialization
        /**
         * @name navbarChangeOnWindowResize
         * @function
         * @description When resized, ('#navbar') will add 18px margin-bottom
         * so ('#content') margin-top needs to be resized
         */
        $(window).resize(function() {
            var navbar_mb = $(".navbar").css("margin-bottom");
            if(navbar_mb == "18px"){
                $("#content").css('margin-top', '0px');
            }else{
                $("#content").css('margin-top', '50px');
            }
        });

        jQuery.fn.simulateKeyPress = function(character) {
              // Internally calls jQuery.event.trigger
              // with arguments (Event, data, elem). That last arguments is very important!
              jQuery(this).trigger(
                { type: 'keypress',
                  which: character.charCodeAt(character.length-1),
                  keyCode: character.charCodeAt(character.length-1)
                });
        };
  });

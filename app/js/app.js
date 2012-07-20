/**
 * @name Application level module
 * @description Declare app level module which depends on filters, directives, and services
 */

'use strict';

angular.module('codeEdit.services', []);    //to include all service modules in separated files
angular.module('codeEdit.directives', []);  //to include all directives modules in separated files

angular.module('codeEdit', ['codeEdit.filters', 'codeEdit.services', 'codeEdit.directives']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: EditorCtrl});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/view1'});
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
  });

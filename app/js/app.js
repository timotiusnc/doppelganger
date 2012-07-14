/*
 * Declare app level module which depends on filters, and services
 * 
 */

'use strict';

//App level services and directives, so that you can separate different directives in different files
angular.module('codeEdit.services', []);
angular.module('codeEdit.directives', []);

angular.module('codeEdit', ['codeEdit.filters', 'codeEdit.services', 'codeEdit.directives']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {template: 'partials/partial1.html', controller: MyCtrl1});
        $routeProvider.when('/view2', {template: 'partials/partial2.html', controller: MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]).
    run(function($rootScope){
        /**Wrapper for angular.isArray, isObject, etc checks for use in the view
         * @param type {string} the name of the check (casing sensitive)
         * @param value {string} value to check
         */
        $rootScope.is = function(type, value) {
            return angular['is'+type](value);
        };
        
        /**Wrapper for $.isEmptyObject()
         * @param value	{mixed} Value to be tested
         * @return boolean
         */
        $rootScope.empty = function(value) {
            return $.isEmptyObject(value);
        };
        
        /**Debugging Tools
         * Allows you to execute debug functions from the view
         */
        $rootScope.log = function(variable) {
            console.log(variable);
        };
        $rootScope.alert = function(text) {
            alert(text);
        };
  });

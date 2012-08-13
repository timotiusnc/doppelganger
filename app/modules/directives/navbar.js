/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditNavbar', function(){
        var controllerFn = function($scope, sharedService){
            $scope.duration = '--';
            $scope.fileName = '';

            $scope.$on(sharedService.HANDLE_BROADCAST, function(){
                if(sharedService.message == sharedService.ONE_SECOND_PASSED){
                    $scope.$apply(function(){
                        $scope.duration = sharedService.param;
                    });
                }else if(sharedService.message == sharedService.CHANGE_NAVBAR_FILENAME){
                    $scope.duration = '--';
                    $scope.fileName = sharedService.param;
                }
            });
        }

        return {
            replace: true,
            controller: controllerFn,
            templateUrl: 'partials/templates/navbar.html',
            transclude: false,
            scope: true
        }
    });

/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('tabbedPane', function() {
        var defaults = {
            itemSelectedAttr: 'selected',
            itemTitleAttr: 'title'
        };

        var opts = {};

        var linkFn = function(scope, elm, attrs){
            opts = angular.extend(defaults, attrs);
        }

        var controllerFn = function($scope, $element, $attrs, sharedService){
            $scope.selectItem = function(item) {
                angular.forEach($scope.items(), function(item) {
                    item[opts.itemSelectedAttr] = false;
                });
                item[opts.itemSelectedAttr] = true;
            };

            $scope.itemSelected = function(item){
                return item[opts.itemSelectedAttr];
            }

            $scope.itemTitle = function(item){
                return item[opts.itemTitleAttr];
            }

            $scope.$on(sharedService.HANDLE_BROADCAST, function(){ //When a new tab added, set selected tab to the newest one
                if(sharedService.message == sharedService.NEW_TAB_ADDED){
                    var i = 1;
                    angular.forEach($scope.items(), function(item) {
                        if(i < $scope.items().length){
                            item[opts.itemSelectedAttr] = false;
                        }else{
                            item[opts.itemSelectedAttr] = true;
                        }
                        ++i;
                    });
                }
            });
        }

        return {
            link: linkFn,
            controller: controllerFn,
            scope: {
                items: 'accessor',
                itemTitleAttr: 'attribute'
            },
            templateUrl: 'partials/templates/tabbed_pane.html'
        }
    });

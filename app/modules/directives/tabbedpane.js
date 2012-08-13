/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('tabbedPane', function(fileHandler) {
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
                angular.forEach($scope.items, function(it) {
                    it[opts.itemSelectedAttr] = false;
                    fileHandler.stopTimer(it[opts.itemTitleAttr]);
                });

                item[opts.itemSelectedAttr] = true;
                fileHandler.startTimer(item[opts.itemTitleAttr]);
                sharedService.prepForBroadcast(sharedService.CHANGE_NAVBAR_FILENAME, item[opts.itemTitleAttr]);
            };

            $scope.itemSelected = function(item){
                return item[opts.itemSelectedAttr];
            }

            $scope.itemTitle = function(item){
                return item[opts.itemTitleAttr];
            }

            $scope.itemInitialContent = function(item){
                return item[opts.itemInitialContentAttr];
            }

            $scope.closeItem = function(item, $event){
                var found = false, i=0;
                while(!found && i<$scope.items.length){
                    if($scope.items[i].tabTitle === item.tabTitle){
                        found = true;
                        $scope.items.splice(i, 1);
                    }
                    ++i;
                }                
                $event.preventDefault();
            }

            $scope.$on(sharedService.HANDLE_BROADCAST, function(){ //When a new tab added, set selected tab to the newest one
                if(sharedService.message == sharedService.NEW_TAB_ADDED){
                    var i = 1;
                    angular.forEach($scope.items, function(item) {
                        if(i < $scope.items.length){
                            item[opts.itemSelectedAttr] = false;
                            fileHandler.stopTimer(item[opts.itemTitleAttr]);
                        }else{
                            item[opts.itemSelectedAttr] = true;
                            fileHandler.startTimer(item[opts.itemTitleAttr]);
                            sharedService.prepForBroadcast(sharedService.CHANGE_NAVBAR_FILENAME, item[opts.itemTitleAttr]);
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
                items: '=',
                itemTitleAttr: '@',
                itemInitialContentAttr: '@'
            },
            templateUrl: 'partials/templates/tabbed_pane.html'
        }
    });

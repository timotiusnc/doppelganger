angular.module('codeEdit.services').
    factory('sharedService', function($rootScope){
    var sharedService = {};

    sharedService.message = '';
    sharedService.param = '';

    sharedService.prepForBroadcast = function(msg, param) {
        this.message = msg;
        this.param = param;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});
'use strict';
(function () {

	angular.module('ff-app-services')
		.factory('navigationService', ['MENU_ITEMS', function(MENU_ITEMS) {

  			var service = {
  				previousState: null,
  				previousStateParams: null,
				menuItems: MENU_ITEMS
			};

    		service.setPreviousState = function(previousState) {
    		
    			service.previousState = previousState;
    		}

    		service.getPreviousState = function() {
    		
    			return service.previousState;
    		}

    		service.setPreviousStateParams = function(previousStateParams) {
    		
    			service.previousStateParams = previousStateParams;
    		}

    		service.getPreviousStateParams = function() {
    		
    			return service.previousStateParams;
    		}
    		
    		service.getMenuItems = function() {
    		
    			return service.menuItems;
    		}

			return service;
		}]);		  		

})();
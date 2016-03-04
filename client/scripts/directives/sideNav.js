'use strict';
(function () {

	angular.module('ff-app')
		.directive('sideNav', ['navigationService', function(navigationService) {
    		return {
		      	restrict: 'E',
      			templateUrl: 'scripts/views/sideNav.html',
      			link: function (scope, element, attrs) {

					scope.menuItems = navigationService.getMenuItems();
					
					scope.hasAuthorization = function(menuItem) {
					
						if( !menuItem.userTypeAuth || scope.isUserAuthorized(menuItem.userTypeAuth) ) {
						
							return true;
						}
						return false;
					}
				}
			}
		}]);	
})();

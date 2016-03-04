'use strict';
(function () {

	angular.module('ff-app')
		.directive('topNav', ['$state', function($state) {
    		return {
		      	restrict: 'E',
      			templateUrl: 'scripts/views/topNav.html',
      			link: function (scope, element, attrs) {

				}
			}
		}]);	
})();

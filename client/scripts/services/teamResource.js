'use strict';
(function () {

	angular.module('ff-app-services')
		.factory('teamResource', ['$resource','SERVICE_URLS', function($resource,SERVICE_URLS) {

  			var service = {};

			var teamResource = $resource('/teams/:id');
  	 		//{
        	//	ListTeams: { method: 'GET', params: {} }
    		//});
    		
    		service.getAllTeams = function() {
    		
    			return teamResource.query().$promise;
    		}

			return service;
		}]);

})();
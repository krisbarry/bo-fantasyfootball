'use strict';
(function () {

	angular.module('ff-app-services')
		.factory('leagueResource', ['$q','$resource','SERVICE_URLS', function($q,$resource,SERVICE_URLS) {

  			var service = {};

			var leagueResource = $resource('/league/:id', null, {'update': { method: 'PUT' }} );

    		service.getLeagues = function() {

    			return leagueResource.query().$promise;
    		}

    		service.getLeague = function(leagueId) {

    			return leagueResource.get({id:leagueId}).$promise;
    		}

    		service.createLeague = function(league) {

    			return leagueResource.save(league).$promise;
    		}

    		service.updateLeague = function(league) {

    			return leagueResource.update({id:league._id},league).$promise;
    		}

    		service.deleteLeague = function(leagueId) {

    			return leagueResource.delete({id:leagueId}).$promise;
    		}

    		return service;
		}]);

})();
'use strict';
(function () {

	angular.module('ff-app-services')
		.factory('playerResource', ['$resource','$q','SERVICE_URLS', function($resource,$q,SERVICE_URLS) {

  			var service = {};

			var playerResource = $resource( '/player/:id', null, {'update': { method: 'PUT' }} );
    		
    		service.getPlayers = function() {

	   			return playerResource.query().$promise;
			}
    		
    		service.searchPlayers = function(searchTerm) {
	
	   			return playerResource.query({search:searchTerm}).$promise;
			}
    		
    		service.findPlayersByName = function(firstName,lastName) {
	
	   			return playerResource.query({firstName:firstName,lastName:lastName}).$promise;
			}

    		service.findPlayersByIds = function(playerIds) {
	
	   			return playerResource.query({playerIds:playerIds.toString()}).$promise;
			}

    		service.getPlayer = function(playerId) {
	
	  	 		return playerResource.get({id:playerId}).$promise;
    		}
    		
    		service.getPlayerByEmailAddress = function(emailAddress) {
	
	   			return playerResource.get({emailAddress:emailAddress}).$promise;
    		}
    		
    		service.createPlayer = function(player) {
	
    			return playerResource.save( player ).$promise;
    		}
    		
    		service.updatePlayer = function(player) {
	
    			return playerResource.update( {id: player._id}, player ).$promise;
    		}
    		
    		service.deletePlayer = function(playerId) {
	
    			return playerResource.delete({id:playerId}).$promise;
    		}
    		
    		return service;
	}]);

})();
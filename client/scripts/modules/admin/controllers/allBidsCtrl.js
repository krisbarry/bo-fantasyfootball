'use strict';
(function () {

	angular.module('ff-app').
		controller('allBidsCtrl', ['$scope','$state','STATES','playerResource', function($scope,$state,$uibModal,STATES,playerResource) {

			var init = function() {

				$scope.bids = [];
				/*leagueService.getBids().then(
					function(bids) {
					
						$scope.bids = bids;
					});*/
			};
			
			$scope.viewBidsDetails = function( playerId ) {
			
				playerResource.getPlayer(playerId).then(
					function(player) {

						$scope.player = player;
					});
			}
			
			init();
		}]);
})();
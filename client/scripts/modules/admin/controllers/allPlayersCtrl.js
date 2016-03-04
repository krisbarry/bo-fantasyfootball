'use strict';
(function () {

	angular.module('ff-app').
		controller('allPlayersCtrl', ['$scope','$state','STATES','playerResource', function($scope,$state,STATES,playerResource) {

			var init = function() {

				playerResource.getPlayers().then(
					function(players) {
					
						$scope.players = players;
					});
			};
			
			$scope.viewPlayerDetails = function( playerId ) {
			
				playerResource.getPlayer(playerId).then(
					function(player) {

						$scope.player = player;
					});
			}

			$scope.deletePlayer = function(playerId,firstName,lastName) {

				$scope.openDialog( 'deletePlayerModal.html',
					function( $rootScope, $scope, $uibModalInstance ) {
      					$scope.playerName = (firstName+' '+lastName);
      					$scope.ok = function () { $uibModalInstance.close(); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function() {
							playerResource.deletePlayer(playerId).then( function() {
							    for( var index=0; index < $scope.players.length; index++ ) {
							    	if( $scope.players[index]._id === playerId ) {
										$scope.players.splice(index,1);
							    		break;
							    	}
							    }
								$scope.alerts = [{type:'success',msg:('"'+firstName+' '+lastName+'" successfully deleted.')}];
							});
      					});
			}			
			
			init();
		}]);
})();
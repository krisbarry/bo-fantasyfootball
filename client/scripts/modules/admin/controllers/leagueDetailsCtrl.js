'use strict';
(function () {

	angular.module('ff-app').
		controller('leagueDetailsCtrl', ['$scope','$state','$stateParams','navigationService','leagueResource','playerResource', function($scope,$state,$stateParams,navigationService,leagueResource,playerResource) {

			var NCAAF_ASSOCIATION_ID = '56cdbdf764c4c0030696aa08';

			var USER_TYPES = [
					{key:'player',value:'Player'},
						{key:'admin',value:'Administrator'}
				];

			var init = function() {

				if( $stateParams.leagueId ) {
					leagueResource.getLeague($stateParams.leagueId).then(
						function(league) {
							$scope.league = league;
						});
				} else {

					$scope.league = {
						association: NCAAF_ASSOCIATION_ID
					};
				}
			}

			$scope.addConferenceDialog = function() {

				$scope.openDialog( 'manageLeagueConferenceModal.html',
					function($scope,$uibModalInstance) {
      					$scope.ok = function () { $uibModalInstance.close($scope.conference); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function(conference) { $scope.league.conferences.push(conference); });
			}

			$scope.updateConferenceDialog = function(index) {

				var conference = $scope.league.conferences[index];

				$scope.openDialog( 'manageLeagueConferenceModal.html',
					function($scope,$uibModalInstance) {
      					$scope.conference = conference;
      					$scope.ok = function () { $uibModalInstance.close($scope.conference); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function(conference) { $scope.league.conferences[index] = conference; });
			}

			$scope.deleteConferenceDialog = function(index) {

				var conference = $scope.league.conferences[index];

				$scope.openDialog( 'deleteLeagueConferenceModal.html',
					function($scope,$uibModalInstance) {
      					$scope.conference = conference;
      					$scope.ok = function () { $uibModalInstance.close(index); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function() { $scope.league.conferences.splice(index,1); });
			}

			$scope.addPlayerDialog = function(league) {

				$scope.openDialog( 'addLeaguePlayerModal.html',
					function($scope,$uibModalInstance) {
						$scope.alerts = [];
						$scope.league = league;
						$scope.playersToAdd = [];
						$scope.userTypes = USER_TYPES;
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
						$scope.setPlayerSelected = function(playerSelected) { $scope.playerSelected = playerSelected; }
      					$scope.ok = function () {
							var conferencesAssignedToAllPlayers = true;
							$scope.playersToAdd.forEach(function(player) {
								if( !player.leagues[0] || !player.leagues[0].conference ) {
									conferencesAssignedToAllPlayers = false;
								}
							});
							if( !conferencesAssignedToAllPlayers ) {
	      						$scope.alerts.push({type:'danger',msg:'A conference must be selected for all league players.'});
							} else {
	      						$uibModalInstance.close($scope.playersToAdd);
	      					}
      					};
						$scope.addRemovePlayer = function(playerResultIndex) {				
							var playerIdExists = false;
							for( var index=0; index<$scope.playersToAdd.length; index++ ) {
								if( $scope.playerResults[playerResultIndex]._id === $scope.playersToAdd[index]._id ) {
									playerIdExists = true;
									$scope.playersToAdd.splice(index,1);
									break;
								}
							}
							if( !playerIdExists ) {
								$scope.playersToAdd.push($scope.playerResults[playerResultIndex]);
							}
						}
						$scope.updatePlayerConference = function(playerResultIndex,conference) {
							$scope.alerts = []
							var playerIdExists = false;
							for( var index=0; index<$scope.playersToAdd.length; index++ ) {
								if( $scope.playerResults[playerResultIndex]._id === $scope.playersToAdd[index]._id ) {
									playerIdExists = true;
									if( $scope.playersToAdd[index].leagues.length === 0 ) {
										$scope.playersToAdd[index].leagues.push({ _id: league._id, conference: conference.name });
									} else {
										$scope.playersToAdd[index].leagues[0]._id = league._id;
										$scope.playersToAdd[index].leagues[0].conference = conference.name;
									}
									break;
								}
							}
							if( !playerIdExists ) {
								$scope.alerts.push({type:'danger',msg:'A player must be selected before selecting their conference.'});
							}
						}			
						$scope.updatePlayerType = function(playerResultIndex,playerType) {
							$scope.alerts = []
							var playerIdExists = false;
							for( var index=0; index<$scope.playersToAdd.length; index++ ) {
								if( $scope.playerResults[playerResultIndex]._id === $scope.playersToAdd[index]._id ) {
									playerIdExists = true;
									if( $scope.playersToAdd[index].leagues.length === 0 ) {
										$scope.playersToAdd[index].leagues.push({ _id: leagueId, userType: playerType.key });
									} else {
										$scope.playersToAdd[index].leagues[0]._id = league._id;
										$scope.playersToAdd[index].leagues[0].userType = playerType.key;
									}
									break;
								}
							}
							if( !playerIdExists ) {
								$scope.alerts.push({type:'danger',msg:'A player must be selected before selecting their user type.'});
							}
						}			
						$scope.findPlayers = function( searchTerm ) {
							return playerResource.searchPlayers(searchTerm).then(
								function(searchResults) {
									var playersToFilterBy = [];
									searchResults.forEach( function(player) {
										playersToFilterBy.push(player.firstName+' '+player.lastName);
									});
									return playersToFilterBy;
								});
						}
						$scope.searchPlayers = function() {
							if( $scope.playerSelected ) {
								return playerResource.findPlayersByName(
											$scope.playerSearchTerm.substring(0,$scope.playerSearchTerm.indexOf(' ')),
												$scope.playerSearchTerm.substring($scope.playerSearchTerm.indexOf(' ')+1)
										).then(function(searchResults) {
											$scope.playerResults = searchResults;
										});
							} else {
								return playerResource.searchPlayers($scope.playerSearchTerm).then(
									function(searchResults) {
										$scope.playerResults = searchResults;
									});
							}
						}
      				},
      					function(playersToAdd) {  
      						var playersToTrulyAdd = [];
      						playersToAdd.forEach(function(playerToAdd) {
      							var playerExists = false;
      							$scope.league.players.forEach(function(existingPlayer) {
      								if( playerToAdd._id === existingPlayer._id ) {
      									playerExists = true;
      								}
      							});
      							if( !playerExists ) {
      								playersToTrulyAdd.push(playerToAdd);
      							}
      						});
      						$scope.league.players = $scope.league.players.concat(playersToTrulyAdd); 
      					});
			}

			$scope.updatePlayerDialog = function(index) {

				var league = $scope.league;

				$scope.openDialog( 'updateLeaguePlayerModal.html',
					function($scope,$uibModalInstance) {
						$scope.userTypes = USER_TYPES;
						$scope.conferences = league.conferences;
						$scope.player = { teamName: league.players[index].leagues[0].teamName };
						USER_TYPES.forEach(function(userType) {
							if( league.players[index].leagues[0].userType === userType.key ) {
								$scope.player.userType = userType;
							}
						});
						league.conferences.forEach(function(conference) {
							if( league.players[index].leagues[0].conference === conference.name ) {
								$scope.player.conference = conference;
							}
						});
      					$scope.ok = function () { $uibModalInstance.close($scope.player); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function(player) {
      						$scope.league.players[index].leagues[0].teamName = player.teamName;
      						$scope.league.players[index].leagues[0].userType = player.userType.key;
      						$scope.league.players[index].leagues[0].conference = player.conference.name;
      					});
			}

			$scope.deletePlayerDialog = function(index) {

				var player = $scope.league.players[index];

				$scope.openDialog( 'deleteLeaguePlayerModal.html',
					function($scope,$uibModalInstance) {
      					$scope.player = player;
      					$scope.ok = function () { $uibModalInstance.close(index); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function() { $scope.league.players.splice(index,1); });
			}

			$scope.createLeague = function() {

				leagueResource.createLeague($scope.league).then( 
					function() {

						$state.go(navigationService.getPreviousState());
					});
			}			

			$scope.updateLeague = function() {

				leagueResource.updateLeague($scope.league).then( 
					function() {

						$state.go(navigationService.getPreviousState());
					});
			}			

			$scope.cancel = function() {
			
				$state.go(navigationService.getPreviousState());
			}
			
			init();

		}]);
})();
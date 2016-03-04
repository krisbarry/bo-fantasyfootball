'use strict';
(function () {

	angular.module('ff-app').
		controller('allLeaguesCtrl', ['$scope','$state','STATES','leagueResource', function($scope,$state,STATES,leagueResource) {

			var init = function() {

				leagueResource.getLeagues().then(
					function(leagues) {
					
						$scope.leagues = leagues;
					});
			};
			
			$scope.viewLeagueDetails = function( leagueId ) {
			
				leagueResource.getLeague(leagueId).then(
					function(league) {

						$scope.league = league;
					});
			}

			$scope.deleteLeague = function(leagueId,leagueName) {

				$scope.openDialog( 'deleteLeagueModal.html',
					function($scope,$uibModalInstance) {
      					$scope.leagueName = leagueName;
      					$scope.ok = function () { $uibModalInstance.close(); };
  						$scope.cancel = function () { $uibModalInstance.dismiss(); };
      				},
      					function(conference) { 
							leagueResource.deleteLeague(leagueId).then( function() {
							    for( var index=0; index < $scope.leagues.length; index++ ) {
							    	if( $scope.leagues[index]._id === leagueId ) {
										$scope.leagues.splice(index,1);
							    		break;
							    	}
							    }
								$scope.alerts = [{type:'success',msg:('"'+leagueName+'" successfully deleted.')}];
							});
      					});
			}			
			
			init();

		}]);
})();
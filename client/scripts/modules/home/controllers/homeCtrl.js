'use strict';
(function () {

	angular.module('ff-app').
		controller('homeCtrl', ['$scope','leagueResource', function($scope,leagueResource) {

			var init = function() {

				if( $scope.getAuthenticatedUser().leagues.length === 1 ) {

					leagueResource.getLeague( $scope.getAuthenticatedUser().leagues[0]._id ).then(
						function( league ) {

							$scope.league = league;
						});


				} // else {  // get all leagues and have user select which they'd like to work with...
			};

			init();

		}]);
})();
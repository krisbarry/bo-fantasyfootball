'use strict';
(function () {

	angular.module('ff-app').
		controller('playerDetailsCtrl', ['$scope','$state','$stateParams','navigationService','playerResource', function($scope,$state,$stateParams,navigationService,playerResource) {

			var init = function() {

				if( $stateParams.playerId ) {
					playerResource.getPlayer($stateParams.playerId).then(
						function(player) {
							$scope.profile = player;
						});
				} else {

					$scope.profile = {};
				}
			}

			$scope.createProfile = function() {

				if( $scope.password && $scope.confirmPassword ) {

					if( $scope.password === $scope.confirmPassword ) {
						$scope.profile.password = $scope.password;
					} else {
						$scope.alerts = [{type:'danger',msg:('The passwords entered do not match, please try again.')}];
						return;
					}
				}

				playerResource.createPlayer($scope.profile).then( 
					function() {

						$state.go(navigationService.getPreviousState());
					}, 
						function(error) {
						
							alert('Error creating user: ' + error);
						});
			}			

			$scope.updateProfile = function() {

				if( $scope.password && $scope.confirmPassword ) {

					if( $scope.password === $scope.confirmPassword ) {
						$scope.profile.password = $scope.password;
					} else {
						$scope.alerts = [{type:'danger',msg:('The passwords entered do not match, please try again.')}];
						return;
					}
				}

				playerResource.updatePlayer($scope.profile).then( 
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
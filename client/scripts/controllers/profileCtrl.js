'use strict';
(function () {

	angular.module('ff-app').
		controller('profileCtrl', ['$scope','$state','STATES','navigationService','playerResource', function($scope,$state,STATES,navigationService,playerResource) {

			var init = function() {
				
				$scope.showProfileTitle = true;
				$scope.profile = $scope.getAuthenticatedUser();
			}

			$scope.cancel = function() {
			
				$state.go(navigationService.getPreviousState());
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
					
						$scope.profile.password = undefined;						
						$scope.setAuthenticatedUser($scope.profile);
					
						$state.go(STATES.HOME_STATE);
					});
			}
			
			init();
		}]);
})();
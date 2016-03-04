'use strict';
(function () {

	angular.module('ff-app').
		controller('loginCtrl', ['$scope','$state','STATES','playerResource', function($scope,$state,STATES,playerResource) {

			$scope.login = function() {
			
				playerResource.getPlayerByEmailAddress($scope.emailAddress).then(
					function(user) {
						// check to see if a valid user was returned (password exists)
						if( user.password && $scope.password === user.password ) {

							user.password = undefined;
											
							$scope.setAuthenticatedUser(user);
				
							$state.go(STATES.HOME_STATE);
						}
						else {
							$scope.password = '';
							$scope.alerts = [
								{type:'danger',msg:'The credentials entered are incorrect, please try again.'}
							];
				
							$state.go(STATES.LOGIN_STATE);
						}
					});
			}
		}]);
})();
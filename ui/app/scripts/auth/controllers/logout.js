/*
 * Copyright 2014-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Handles user logouts.
 *
 * @author Gunnar Hillert
 */
define([], function () {
  'use strict';
  return ['$window', 'DataflowUtils', '$state', '$log', '$rootScope', '$http', 'userService', function ($window, DataflowUtils, $state, $log, $rootScope, $http, user) {
    $log.info('Logging out...');

    if ($rootScope.user.isFormLogin) {
      $http.get($rootScope.dataflowServerUrl + '/dashboard/logout').then(function() {

        $rootScope.user.username = '';
        $rootScope.user.isAuthenticated = false;
        $rootScope.user.isFormLogin = false;

        user = {
          authenticationEnabled: true,
          isFormLogin: false,
          isAuthenticated: false,
          username: ''
        };

        delete $http.defaults.headers.common[$rootScope.xAuthTokenHeaderName];
        DataflowUtils.growl.success('Logged out.');
        $state.go('login');
      });
    }
    else{
      var logoutUrl = '//' + $window.location.host + '/logout';
      console.log('Redirecting to ' + logoutUrl);
      $window.open(logoutUrl, '_self');
    }
  }];
});

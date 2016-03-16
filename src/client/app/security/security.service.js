(function () {
    'use strict';

    angular
        .module('event-managing-security')
        .service('SecurityService', SecurityService);

    SecurityService.$inject = ['$http', 'Session', 'lodash'];

    /* @ngInject */
    function SecurityService($http, Session, lodash) {
        var service = this;
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;

        ////////////////
        function login(credentials) {
            return $http
                .post('/api/login', credentials)
                .then(function (response) {
                    if (response.data.status === 200) {
                        var user = response.data.user;
                        Session.create(user.id, user, user.roles);
                        return true;
                    } else {
                        Session.destroy();
                        return false;
                    }
                });
        }

        function isAuthenticated() {
            return !!Session.id;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            if (authorizedRoles.indexOf('*') !== -1) {
                return isAuthenticated();
            }

            var authorized = lodash.intersection(authorizedRoles, Session.userRoles).length > 0;
            return (isAuthenticated() && authorized);
        }
    }
})();

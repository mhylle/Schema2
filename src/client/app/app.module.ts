/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///// <reference path="../../../../tools/typings/angularjs/angular-route.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'ui.router',
        'blocks.logger'
    ]).config(['$stateProvider', configuration]);
    //.config(toastrConfig);

    //function toastrConfig(toastr: Toastr) {
        //toastr.options.timeOut = 4000;
        //toastr.options.positionClass = 'toastr-bottom-right';
    //}

    /* applicationVersion */
    var applicationVersion : string;
    function configuration($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                access: {allowAnonymous: true}
            })
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                access: {allowAnonymous: false}
            })
            .state('users.list', {
                url: '/list',
                templateUrl: 'app/users/list/userlist.html',
                access: {allowAnonymous: false}
            })
            .state('users.create', {
                url: '/create',
                templateUrl: 'app/users/create/createUser.html',
                access: {allowAnonymous: true}
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home.html',
                access: {allowAnonymous: true}
            });
    }
}

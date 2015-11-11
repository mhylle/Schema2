///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name SecurityController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module app.controllers {
    import ISecurityService = app.services.ISecurityService;

    export class SecurityController implements ISecurityController {
        static controllerId = 'SecurityController';
        title:string;
        username:string;
        password:string;
        loginStatus:string;

        static $inject = ['logger', 'securityservice'];

        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private securityService:ISecurityService) {
            this.init();
        }

        private init() {
            this.title = 'Security';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated Security View');
        }

        login():void {
            this.loginStatus = 'Logging in.';
            this.logger.info('Logging in');
            var that = this;
            this.securityService.login(this.username, this.password).then(function(response) {
                that.logger.info('Inside promise');
                if (response) {
                    that.logger.info('Successfully logged in.');
                    that.loginStatus ='Successfully logged in.';
                } else {
                    that.logger.info('Failed login.');
                    that.loginStatus =  'Failed login.';
                }
            });
        }
    }
    angular.module('app')
        .controller(SecurityController.controllerId, SecurityController);
}

///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name UserController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module app.controllers {
    import IUserService = app.services.IUserService;

    export class UserController implements IUserController {

        static controllerId = 'UserController';
        title:string;
        userList:IUser[];
        private $q:ng.IQService;
        static $inject = ['logger', 'userservice', '$q'];
        errorMessage: string;

        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private userService:IUserService) {
            this.init();
        }

        private init() {
            this.title = 'Users';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated User View');
        }

        users():void {
            var that = this;

            this.userService.users().then(function (response) {
                if (response) {
                    if (response.status == 200) {
                        that.logger.info('Successfully called the users service.');
                        that.userList = response;
                    } else {
                       that.logger.error('Got an error while trying to retrieve users. Code: ' + response.status + ' , Message: ' + response.data)
                        that.userList = [];
                        that.errorMessage = response.data;
                    }
                } else {
                    that.logger.info('Could not retrieve user list.');
                    that.userList = null;
                }
            });
        }
    }
    angular.module('app')
        .controller(UserController.controllerId, UserController);
}

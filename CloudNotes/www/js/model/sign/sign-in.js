"use strict";

    var app = angular.module('App');

    app
        .controller('SignIn', ['$scope', 'login', '$ionicLoading', '$location',
            function($scope, login, $ionicLoading, $location) {

                /**
                 * 数据体
                 */
                $scope.user = {
                    account:  '',
                    password: '',
                }

                $scope.login = function() {

                    console.log($scope.user);

                    if(!$scope.user.account || !$scope.user.password) {
                        $ionicLoading.show({
                            template: '账号或密码不能为空',
                            noBackdrop: true,
                            duration: 2000,
                        });
                    }

                    login($scope.user, function(result) {

                        console.log(result);

                        if(!result) return;

                        if(result.status === true) {
                            userId = result.account;
                            userTime = result.time;

                            $scope.user.account  = '';
                            $scope.user.password = '';

                            $location.path('/notes');
                            return;
                        }

                        if(result.status === false) {
                            $ionicLoading.show({
                                template: '账号或密码错误',
                                noBackdrop: true,
                                duration: 2000,
                            });
                        }

                        //
                    });
                }

            }
        ])
    ;

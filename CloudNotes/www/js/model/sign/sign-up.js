"use strict";

    var app = angular.module('App');

    app
        .controller('SignUp', ['$scope', '$$', '$http', '$ionicLoading', '$location', 'check', 'addUser',
            function($scope, $$, $http, $ionicLoading, $location, check, addUser) {
                $scope.user = {
                    email: '',
                    account: '',
                    password: '',

                    add: function() {

                        console.log(this);

                        if(!this.account || !this.password || this.email == '') {
                            $ionicLoading.show({
                                template: '邮箱，账号，密码不能为空',
                                noBackdrop: true,
                                duration: 2000,
                            });
                            return;
                        }

                        /**
                         * 邮箱不合格
                         */
                        if(this.email === undefined) {
                            $ionicLoading.show({
                                template: '邮箱格式错误',
                                noBackdrop: true,
                                duration: 2000,
                            });
                            return;
                        }

                        /**
                         * 邮箱是否已经存在
                         */

                        check({name: 'email', value: $scope.user.email}, function(result) {
                            if(!result.status) {
                                check({name: 'account', value: $scope.user.account}, function(result) {
                                    if(!result.status) {
                                        /**
                                         * 注册
                                         */
                                        var user = {
                                                email:      $scope.user.email,
                                                account:    $scope.user.account,
                                                password:   $scope.user.password,
                                            };

                                        console.log(user);

                                        addUser(user, function(result) {
                                            console.log(result);
                                            $scope.user.email    = '';
                                            $scope.user.account  = '';
                                            $scope.user.password = '';
                                        })

                                        $location.path("/sign-up/sucess");
                                    }
                                    else {
                                        $ionicLoading.show({
                                            template: '此账号已注册',
                                            noBackdrop: true,
                                            duration: 2000,
                                        });
                                    }
                                });
                            }
                            else {
                                $ionicLoading.show({
                                    template: '此邮箱已注册',
                                    noBackdrop: true,
                                    duration: 2000,
                                });
                            }
                        });
                    },
                };
            }
        ])
    ;

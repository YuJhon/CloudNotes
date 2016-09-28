'use strict';

    var app = angular.module('App');

    app
        .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            /* 取消自动添加后退符 */
            $ionicConfigProvider.backButton.text(false);
            $ionicConfigProvider.backButton.previousTitleText(false);
            $ionicConfigProvider.backButton.icon(false);

            var Store = {
                add: function(name, value) {
                    localStorage[name] = value;
                    return this;
                },
                clear: function() {
                    localStorage.clear();
                    return this;
                },
                set: function(name, value) {
                    localStorage.setItem(name, value);
                    return this;
                },
                get: function(name) {
                    return localStorage[name];
                },
                remove: function(name) {
                    localStorage.removeItem(name);
                    return this;
                },
            };


            $stateProvider
                /* 开始的介绍幻灯片 */
                .state('overView', {
                    url: '/overView',
                    templateUrl: 'views/overView/overView.html',
                })

                .state('notes', {
                    url: '/notes',
                    templateUrl: 'views/notes/notes.html',
                })

                .state('sign-in', {
                    url: '/sign-in',
                    templateUrl: 'views/sign/sign-in/sign-in.html',
                })

                .state('sign-up', {
                    url: '/sign-up',
                    templateUrl: 'views/sign/sign-up/sign-up.html',
                    controller: 'SignUp',
                })

                .state('sign-up-success', {
                    url: '/sign-up/sucess',
                    templateUrl: 'views/sign/sign-up/sign-up-success.html',
                    controller: 'SignUp',
                })
            ;

            /**
             * 是否是第一次打开
             */
            if(Store.get('start')) {
                $urlRouterProvider.otherwise('/sign-in');
            }
            else {
                $urlRouterProvider.otherwise('/overView');
                Store.set('start', true);
            }

        })


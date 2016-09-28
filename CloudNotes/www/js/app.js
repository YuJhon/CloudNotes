'use strict';

    /**
     * 已激活的账号信息
     * @global 全局变量
     */
    var userId   = '';
    var userTime = '';

    var app = angular.module('App', ['ionic']);

    app
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if(window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .factory('$$', function() {
            return function(select, content) {
                content = content || document;
                return Array.prototype.slice.call(
                    content.querySelectorAll(select)
                );
            };
        })

        .controller('Menu', ['$scope', '$rootScope',
            function($scope, $rootScope) {
                $rootScope.userId = userId;
            }
        ])
    ;



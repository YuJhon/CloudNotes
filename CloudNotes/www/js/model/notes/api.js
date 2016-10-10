'use strict';

    var app = angular.module('App');

    app
        /**
         * 获取数据列表
         * @param{Number} index
         * @param{Number} userId
         * @param{Function} callbakc(result)
         */
        .factory('getlist', function(NoteData) {
            return function(index, userId, $scope) {
                NoteData.get(index, userId,
                    function(result) {
                        result = Array.prototype.slice.call(result);
                        $scope.noteData = result;
                    }, $scope
                );
            }
        })

        /**
         * 增加笔记
         * @{
         *      _id: number,
         *      userId: number,
         *      title: string,
         *      content: string,
         *      star: boolean,
         *      time: string,
         * }
         */
        .factory('addNote', function($http, $ionicLoading) {
            return function(data, callback) {
                $ionicLoading.show({
                    noBackdrop: true
                });

//              console.log(data);

                $http
                    .post('http://127.0.0.1:8888/notes/add', data)
                    .success(function(result) {
                        $ionicLoading.hide();
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(result) {
                        $ionicLoading.show({
                            template: '增加失败',
                            duration: 3000,
                        });
                    })
                    .finally(function() {
                        //
                    })
                ;
            };
        })

        /**
         * 删除笔记
         * @param{Number} _id
         * @param{Number} userId
         */
        .factory('delNote', function($http, $ionicLoading) {
            return function(data, callback) {
                $ionicLoading.show({
                    noBackdrop: true,
                });

//              console.log(data);

                $http
                    .post('http://127.0.0.1:8888/notes/del', data)
                    .success(function(result) {
                        $ionicLoading.hide();
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '删除失败',
                            duration: 3000,
                        });
                    })
                    .finally(function(){
                        //
                    })
                ;
            };
        })


        /**
         * 保存
         * @param{Number} _id
         * @param{Number} userId
         */
        .factory('saveNote', function($http, $ionicLoading) {
            return function(data, callback) {
                $ionicLoading.show({
                    noBackdrop: true,
                });

//              console.log(data);

                $http
                    .post('http://127.0.0.1:8888/notes/save', data)
                    .success(function(result) {
                        $ionicLoading.hide();
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '保存失败',
                            duration: 3000,
                        });
                    })
                    .finally(function(){
                        //
                    })
                ;
            };
        })

        /**
         * 收藏
         * @param{Number} _id
         * @param{Number} userId
         * @param{Boolean} star
         */
        .factory('starNote', function($http, $ionicLoading) {
            return function(data, callback) {

//              console.log(data);

                $http
                    .post('http://127.0.0.1:8888/notes/star', data)
                    .success(function(result) {
                        //
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '收藏失败',
                            duration: 3000,
                        });
                    })
                    .finally(function() {
                        //
                    })
                ;
            }
        })

        /**
         * 检验
         * @param{String} name
         * @param{String} value
         */
        .factory('check', function($http, $ionicLoading) {
            return function(data, callback) {

                $http
                    .post('http://127.0.0.1:8888/users/check', data)
                    .success(function(result) {
                        //
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '检查失败',
                            duration: 3000,
                        });
                    })
                    .finally(function() {
                        //
                    })
                ;
            }
        })

        .factory('addUser', function($http, $ionicLoading) {
            return function(data, callback) {

                $http
                    .post('http://127.0.0.1:8888/users/sign-up', data)
                    .success(function(result) {
                        //
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '添加失败',
                            duration: 3000,
                        });
                    })
                    .finally(function() {
                        //
                    })
                ;
            }
        })

        /**
         * 登录
         */
        .factory('login', function($http, $ionicLoading) {
            return function(data, callback) {

                $http
                    .post('http://127.0.0.1:8888/users/sign-in', data)
                    .success(function(result) {
                        //
                        if(typeof callback === 'function') {
                            callback(result);
                        }
                    })
                    .error(function(error) {
                        $ionicLoading.show({
                            template: '登录失败',
                            duration: 3000,
                        });
                    })
                    .finally(function() {
                        //
                    })
                ;
            }
        })

    ;

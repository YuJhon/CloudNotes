'use staict';

    var app = angular.module('App');

    app
        .factory('Modal', function($ionicModal) {
            return function Modal(path, option) {

                if( !(this instanceof Modal)) {
                    return new Modal(path, option);
                }

                var m = {
                    modal: '',
                    show: function() {
                        if(this.modal) {
                            this.modal.show();
                        }
                        else {
                            var $this = this;

                            $ionicModal
                                .fromTemplateUrl(
                                    path, {
                                        scope: option.scope,
                                        animation: option.animation,
                                    }
                                )
                                .then(function(modal) {
                                    $this.modal = modal;
                                    $this.modal.show();
                                })
                            ;
                        }
                    },
                    hide: function(remove) {
                        if(this.modal) {
                            this.modal.hide();
                            if(remove) {
                                this.modal.remove();
                            }
                        }
                    }
                };

                option.scope.$on('$destroy', function() {
                    if(m.modal) {
                        m.modal.remove();
                    }
                });

                return m;
            };
        })

        .factory('$$', function() {
            return function(select, content) {
                content = content || document;
                return Array.prototype.slice.call(
                    content.querySelectorAll(select)
                );
            };
        })

        .factory('Store', function() {
            return {
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
        })

        .factory('NoteData', function($http) {

            return {
                get: function(index, userId, callback, $scope) {
                    $http
                        .post('http://127.0.0.1:8888/notes/getList', {
                            index: index,
                            userId: userId,
                        })
                        .success(function(result) {
                            if(typeof callback === 'function') {
                                callback(result);
                            }
                        })
                        .error(function(error) {
                            console.log(error);
                        })
                        .finally(function() {
                            $scope.$broadcast('scroll.refreshComplete');
                        })
                    ;
                },
            }
        })

    ;










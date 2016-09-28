'use strict';

    /* 深拷贝 */
    var deepCopy = function(source) {
        var result = {};
        for(var key in source) {
            result[key] =
                typeof source[key] === 'object' ?
                deepCoyp(source[key]) : source[key];
        }

        return result;
    };

    var app = angular.module('App');

    app
        .controller('Notes', [
            '$scope',
            '$timeout',
            'Modal',
            'NoteData',
            '$$',
            'getlist',
            'addNote',
            'delNote',
            'saveNote',
            'starNote',

            function(
                $scope,
                $timeout,
                Modal,
                NoteData,
                $$,
                getlist,
                addNote,
                delNote,
                saveNote,
                starNote
            ){

                var get = function(index, userId) {
                    getlist(1, userId, $scope);
                }; get(1, userId);

                $scope.doRefresh = function() {
                    get(1, userId);
                };

                $scope.time = new Date();
                $scope.newNote = null;

                (function clock () {
                    $scope.time = new Date();
                    $timeout(function() {
                        $scope.$apply(clock());
                    }, 1000);
                })();

                $scope.NOTE = {
                    /* 初始化 */
                    init: function(has) {
                        /* 处于修改状态 */
                        if(has) {
                            $scope.newNote = $scope.note;
                            var c = $$('#content')[0];
                            if(c) c.innerText = $scope.newNote.content;
                            return true;
                        }
                        $scope.newNote = {
                            _id:     null,
                            title:   null,
                            time:    null,
                            content: null,
                            star:    false,
                        }
                    },

                    /* 根据index索引视图数据 */
                    getIndex: function(index) {
                        var $this = this;

                        // 深拷贝
                        // 临时结点
                        $scope.note = deepCopy($scope.noteData[index]);

                        console.log($scope.note.star);

                        $scope.note.setStar = function() {
                            // post
                            $this.star($scope.note, function() {
                                $scope.note.star = $scope.noteData[index].star = !$scope.note.star;

                                console.log($scope.note.star);

                            });
                        };
                    },

                    add: function() {
                        /* 保存 */
                        if($scope.newNote._id) {
                            this.save();
                            return;
                        }

                        var $this = this,
                            times = new Date().getTime(),

                            data = {
                                _id:     times,
                                userId:  userId,
                                title:   $scope.newNote.title,
                                content: $$('#content')[0].innerText,
                                star:    $scope.newNote.star,
                                time:    times,
                            };

                        addNote(data, function() {
                            $scope.noteData.splice(0, 0, data);
                            $this.clear();
                            $scope.write.hide();
                        });
                    },

                    star: function(note, callback) {
                        var $this = this,

                            data = {
                                _id:    note._id,
                                userId: userId,
                                star:   !note.star,
                            };

                        starNote(data, callback);
                    },

                    save: function() {
                        var $this = this,

                            data = {
                                _id:     $scope.newNote._id,
                                userId:  userId,
                                title:   $scope.newNote.title,
                                content: $$('#content')[0].innerText,
                                star:    $scope.newNote.star,
                                time:    new Date().getTime(),
                            };

                        saveNote(data, function() {
                            for(var i in $scope.noteData) {
                                if($scope.noteData[i]._id === $scope.newNote._id) {
                                    $scope.noteData[i] = data;
                                }
                            }
                            $this.clear();
                            $scope.write.hide();
                        });

                    },

                    del: function(index) {
                        var $this = this,

                            data = {
                                _id: $scope.noteData[index]._id,
                                userId: userId,
                            };

                        console.log($scope.noteData[index]);

                        delNote(data, function() {
                            $scope.noteData.splice(index, 1);
                        });
                    },

                    /* 更新数据 */
                    update: function() {
                        var c = $$('#content')[0];
                        $scope.newNote.content =  c.innerText;
                        // 修改某个神奇的bug
                        c.innerHTML = $scope.newNote.content;
                    },

                    /* 清空数据 */
                    clear: function() {
                        $scope.note    = undefined;
                        $scope.newNote = undefined;
                        $$('#content')[0].innerHTML = '';
                    },
                };

                /* 模型实体图 */
                $scope.write = Modal('views/write/write.html', {
                    scope: $scope,
                });

                $scope.see = Modal('views/write/see/see.html', {
                    scope: $scope,
                    animation: 'slide-in-right',
                });

                $scope.edit = Modal('views/write/show.html', {
                    scope: $scope,
                    animation: 'slide-in-left',
                });

            }
        ])
    ;



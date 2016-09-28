'use strict';

    var app = angular.module('App');

    app
        .directive('markdown', function() {
            var converter = new showdown.Converter();

            return {
                scope: {
                    /**
                     * 单向绑定
                     */
                    markdown: '@'
                },

                link: function(scope, element, attrs) {
                    /* 监控这个指令 */
                    scope.$watch('markdown', function() {
                        var content = converter.makeHtml(attrs.markdown);
                        element.html(content);
                    });
                }
            }
        })

    ;


    var express = require('express'),
        mongo   = require('./../model/Db/db'),
        Db      = mongo.db(),
        Select  = mongo.model('notes', 'note'),
        router  = express.Router();


    router

        /**
         * 根据页码获取笔记列表
         * @param{Number} index
         * @param{Number} userId
         */
        .post('/getList', function(request, response, next) {

            var post = request.body;
            var len = 10;

            console.log(JSON.stringify(post, null, 4));

            Select
                .find({ userId: post.userId }, { userId: 0 })
                .sort({ time: -1 })
                .skip(len * (post.index - 1))
                .limit(len)
                .exec(function(error, result) {
                    console.log(result);
                    if(error) {
                        response.status(500).jsonp(error);
                        return;
                    }

                    response.status(200).jsonp(
                        Array.prototype.slice.call(result)
                    );
                });
        })

        /**
         * 增加笔记
         * @param{Number} _id
         * @param{String} title
         * @param{String} time
         * @param{String} content
         * @param{Boolean} star
         * @param{Number} userId
         */
        .post('/add', function(request, response, next) {

            var post = request.body;

            console.log(JSON.stringify(post, null, 4));

            var data = {
                _id:     post._id,
                userId:  post.userId,
                title:   post.title,
                content: post.content,
                star:    post.star,
                time:    post.time,
            };

            /* 增加 */
            Select.create(data, function(error, result) {
                if(error) {
                    console.log(JSON.stringify(error, null, 4));
                    delete error.message;
                    response.status(500).jsonp(JSON.stringify(error, null, 4));
                    return;
                }

                response.status(200).jsonp(result);
            });
        })

        /**
         * 删除笔记
         * @param{Number} _id
         * @param{Number} userId
         */
        .post('/del', function(request, response, next) {

            var post = request.body;

            console.log(JSON.stringify(post, null, 4));

            var data = {
                _id:    post._id,
                userId: post.userId,
            };

            /* 删除 */
            Select.remove(data, function(error, result) {
                if(error) {
                    delete error.message;
                    response.status(500).jsonp(JSON.stringify(error, null, 4));
                    console.log();
                    return;
                }

                response.status(200).jsonp(result);
            });
        })

        /**
         * 保存
         */
        .post('/save', function(request, response, next) {

            var post = request.body;

            var data = {
                title:   post.title,
                content: post.content,
                star:    post.start,
                time:    post.time,
            };

            console.log(JSON.stringify(post, null, 4));

            /* 更新 */
            Select.update({
                _id:    post._id - 0,
                userId: post.userId,
            }, data,
            function(error, result) {
                if(error) {
                    response.status(500).jsonp(error);
                    return;
                }

                response.status(200).jsonp(result);
            });

        })

        /**
         * 收藏
         * @param{Number} _id
         * @param{Number} userId
         * @param{Boolean} star
         */
        .post('/star', function(request, response, next) {

            var post = request.body;

            var data = {
                star: post.star,
            }

            Select.update({
                _id:    post._id - 0,
                userId: post.userId,
            }, data,
            function(error, result) {
                if(error) {
                    response.status(500).jsonp(error);
                    return;
                }

                response.status(200).jsonp(result);
            });
        })

    ;

    module.exports = router;
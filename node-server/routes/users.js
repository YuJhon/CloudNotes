
    var express = require('express'),
        router  = express.Router()
        mongo   = require('./../model/Db/db'),
        Db      = mongo.db(),
        Select  = mongo.model('users', 'user');

    /**
     * 加密
     */
    var crypto = require('crypto'),

        md5 = function(str) {
            var salt = 'zxaSAjk3123';
            return crypto.createHash('md5')
                .update(str + salt).digest('hex');
        };

    /* GET users listing. */
    router
        .get('/', function(req, res, next) {
            res.send('respond with a resource');
        })

        /**
         * 登录
         * @param{String} account
         * @param{String} password
         */
        .post('/sign-in', function(request, response, next) {
            var post = request.body;

            var user = {
                    account:    post.account,
                    password:   md5(post.password),
                };

            Select.findOne(user, {
                _id: 0,
                account: 1,
            },
            function(error, result) {
                if(error) {
                    delete error.message;
                    console.log(JSON.stringify(error, null, 4));
                    response.status(500).jsonp(
                        JSON.stringify(error, null, 4)
                    );
                    return;
                }

                console.log(JSON.stringify(result, null, 4));

                if(result) {
                    var account = result.account;

                    /**
                     * 账号存在
                     * 返回 账号，登录时间
                     */
                    if(account) {
                        response.status(200).jsonp({
                            status:     true,
                            account:    result.account,
                            signTime:   new Date().getTime(),
                        });
                        return;
                    }
                }

                /**
                 * 用户不存在
                 * 返回 false
                 */
                response.status(200).jsonp({
                    status: false,
                });
            });

        })

        /**
         * 注册
         * @param{String} account
         * @param{String} password
         * @param{String} email
         * @param{Number} _id
         * @param{Number} time
         */
        .post('/sign-up', function(request, response, next) {
            var post = request.body,
                time = new Date().getTime();

            var user = {
                    _id:        time,
                    account:    post.account,
                    password:   md5(post.password),
                    email:      post.email,
                    time:       time,
                };

            console.log(JSON.stringify(user, null, 4));

            /**
             * add db
             */
            Select.create(user, function(error, result) {
                if(error) {
                    delete error.message;
                    console.log(JSON.stringify(error, null, 4));
                    response.status(500).jsonp(
                        JSON.stringify(error, null, 4)
                    );
                    return;
                }

                console.log(JSON.stringify(result, null, 4));

                /**
                 * return
                 */
                response.status(200).jsonp({
                    account:    post.account,
                    password:   post.password,
                    email:      post.email,
                });
            });
        })

        /**
         * 检验邮箱是否已经存在，或账号
         */
        .post('/check', function(request, response, next) {
            var post = request.body;

            // 检验邮箱格式 略...

            var name  = post.name,
                value = post.value;

            var data = {};
            data[name] = value;

            Select
                .find(data)
                .count()
                .exec(function(error, result) {
                    if(error) {
                        console.log(error);
                        return;
                    }

                    console.log(result);

                    if(result === 0) {
                        response.status(200).jsonp({
                            status: false,
                        });
                    }
                    else {
                        response.status(200).jsonp({
                            status: true,
                        });
                    }
                })
            ;
        })

    ;

    module.exports = router;


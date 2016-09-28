
    var mongoose = require('mongoose');

    var url    = '127.0.0.1:27017/',
        dbName = 'cloudNotes';

    var flag = false,
        dbs  = null;

    var note = {
        _id: Number,            /* id */
        title: String,          /* 标题 */
        content: String,        /* 内容 */
        star:  Boolean,         /* 收藏状态 */
        time: String,           /* 最新发布/修改时间 */
        userId: String,         /* 用户的账号 */
    };

    var user = {
        _id: Number,            /* id */
        account: String,        /* 账号 */
        password: String,       /* 密码 */
        email: String,         /* 邮箱 */
        time: String,           /* 创建时间  */
    }

    module.exports = {
        db: function() {
            if(!flag) {
                dbs  = mongoose.connect(url + dbName);
                flag = true;
            }
            return dbs;
        },

        types: {
            note:   new mongoose.Schema(note, {versionKey: false}),
            user:   new mongoose.Schema(user, {versionKey: false}),
        },

        model: function(tabelName, type) {
            var db = this.db();
            return db.model(tabelName, this.types[type], tabelName);
        },

        setTable: function(name) {
            table = name;
        },
    };
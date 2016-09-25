
    var mongoose = require('mongoose');

    var url    = '127.0.0.1:27017/',
        dbName = 'cloudNotes',
        table  = 'notes';

    var flag = false,
        dbs  = null;

    var type = {
        _id: Number,            /* id */
        title: String,          /* 标题 */
        content: String,        /* 内容 */
        star:  Boolean,         /* 收藏状态 */
        time: String,           /* 最新发布/修改时间 */
        userId: Number,         /* 用户的id */
    };

    module.exports = {
        db: function() {
            if(!flag) {
                dbs  = mongoose.connect(url + dbName);
                flag = true;
            }
            return dbs;
        },

        types: new mongoose.Schema(type, {versionKey: false}),

        model: function() {
            var db = this.db();
            return db.model(table, this.types, table);
        },

        setTable: function(name) {
            table = name;
        },
    };
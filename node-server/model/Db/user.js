
    var mongoose = require('mongoose');

    var url    = '127.0.0.1:27017/',
        dbName = 'cloudNotes',
        table  = 'users';

    var flag = false,
        dbs  = null;

    var type = {
        _id: Number,            /* id */
        account: String,        /* 账号 */
        password: String,       /* 密码 */
        email: Boolean,         /* 邮箱 */
        time: String,           /* 创建时间  */
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
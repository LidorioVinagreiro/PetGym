const mysql = require('mysql');
var pool;

module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = mysql.createPool({
            host: "mysql-service",
            database: "PetGym",
            user: "root",
            password: "mysql",
            port: 3306
        });
        return pool;
    }
};


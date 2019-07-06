const mysql = require('mysql');
var pool;
//var config;

/*mysqlDbConfig = {
    mysqlpool: mysql.createPool({
    host: "10.27.249.150",
    database: "QuintaMiao",
    user:"root",
    password: "testelid1111",
    port: 3306
    })
};
*/
/*mysqlDbConfiguration = {
    mysqlpool: mysql.createPool({
    host: "10.96.234.119",
    database: "QuintaMiao",
    user:"root",
    password: "mysql",
    port: 3306
    })
};
*/
//10.96.234.119
module.exports = {
getPool: function (){
    if(pool) return pool;
    pool = mysql.createPool({
        host: "mysql-service",
        database: "PetGym",
        user:"root",
        password: "mysql",
        port: 3306
        });
        return pool;
}
};

//para usar isto é necessário sempre que precisamos de connectar a dabase fazer:
/*
const mysqlconfig = require('mysqlDbConfig.js').mysql_pool;

mysqlconfig.getConnection(function(err,connection){
    connection.query('query aqui',[campos],function(err,rows){
        connection.release();
    });
});
*/

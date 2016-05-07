var mysql = require('mysql');

var source = {  localhost: {
                    port: 8889,
                    host: 'localhost',
                    user: 'root',
                    password: 'root',
                    database: 'star_wars'
                },
                jawsDB: {
                    port: 3306,
                    host: 'l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
                    user: 'yxjlocifzxspnk0g',
                    password: 'a51ni486kecxmdq6',
                    database: 'cnl4r1y8g3rokku6'
                }
            };

var connection = mysql.createConnection(source.jawsDB);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
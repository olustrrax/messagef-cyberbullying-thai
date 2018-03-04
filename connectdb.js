var mysql = require('mysql');
var fs = require('fs')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'tweet',
  charset: 'utf8mb4_unicode_ci'
});

module.exports = {
    insertMessage: function(inserts) {
        connection.query('INSERT INTO tweet SET ?', inserts, function (error, results, fields) {
            if (error) { 
                console.log(error);
            }
            // else console.log('success');
        });
    },
};
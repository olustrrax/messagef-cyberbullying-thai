var mysql = require('mysql');
var fs = require('fs')

// var number = fs.readFileSync('./wordseg/last_message_id.txt', 'utf8').split('\n');  

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'tweet'
});

module.exports = {
    insertMessage: function(inserts) {
        connection.query('INSERT INTO tw1 SET ?', inserts, function (error, results, fields) {
            if (error) { console.log(error);}
            else console.log('success');
        });
        connection.query('INSERT INTO tw1 SET ?', {title: 'test'}, function(err, result) {
            if (err) throw err;
            
            console.log(result.insertId);
        });
    },
};
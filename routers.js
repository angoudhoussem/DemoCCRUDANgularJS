var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var body      = require('body-parser');
var urlEncoded = body.urlencoded({extended:false});

var users = require('./routers');

var connection = mysql.createConnection({
    host     : '127.0.0.1:8889',
    user     : 'root',
    password : 'root',
    database : 'DemoangularJS',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.end('Hello route');
});

router.get('/all', function(req, res, next) {

    connection.query('SELECT * from Employe ', function(err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.end(JSON.stringify(rows));
        }  else
            console.log('Error while performing Query.');
    });
});


module.exports = router;

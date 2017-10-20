var express    = require("express");
var mysql      = require('mysql');
var body      = require('body-parser');
var urlEncoded = body.urlencoded({extended:false});
var cors = require('cors')
var connection = mysql.createConnection({
    host     : '127.0.0.1:8889',
    user     : 'root',
    password : 'root',
    database : 'DemoangularJS',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

});


var app = express();
app.use(cors())
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('public'));


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... OUI");
    } else {
        console.log("Error connecting database ... nn");
    }
});


app.get("/",function(req,res){

     res.sendFile(__dirname +"/index.html")

});

app.get("/all",function(req,res){


    connection.query('SELECT * from Employe ', function(err, rows, fields) {
       // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.end(JSON.stringify(rows));
        }  else
            console.log('Error while performing Query.');
    });

});

app.post("/add",urlEncoded,function(req,res){

      var response  = {

             name : req.body.name,
             adress : req.body.adress,
             gender : req.body.gender
      }
      console.log(response);
      var sql="INSERT INTO `Employe`(`name`, `adress`, `gender`) VALUES ('"+req.body.name+"','"+req.body.adress+"','"+req.body.gender+"')"

     console.log(sql);
    connection.query(sql, function(err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
        }  else
            console.log('Error while performing Query.');
    });


     /// res.end(JSON.stringify(response));


});



app.post("/update",urlEncoded,function(req,res){



    var sql="UPDATE `Employe` SET `name`='"+req.query.name+"',`adress`='"+req.query.adress+"',`gender`='"+req.query.gender+"' WHERE id="+req.query.id;
    connection.query(sql, function(err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.end(JSON.stringify(rows));
        }  else
            console.log('Error while performing Query.');
    });


    /// res.end(JSON.stringify(response));


});



app.get("/delete",urlEncoded,function(req,res){

    var sql="DELETE FROM `Employe` WHERE id="+req.query.id;
    connection.query(sql, function(err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            if(rows.affectedRows == 1) {

                res.end("OK");
            } else {

                res.end("No");
            }



        }  else {

            console.log('Error while performing Query.');
            res.end("No");


        }
    });


    /// res.end(JSON.stringify(response));


});



app.get("/getID",function(req,res){

    var sql="SELECT * FROM `Employe` WHERE id="+req.query.id;
    connection.query(sql, function(err, rows, fields) {
        // connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.end(JSON.stringify(rows));
        }  else
            console.log('Error while performing Query.');
    });


    /// res.end(JSON.stringify(response));


});







app.listen(3000);

console.log("my server  http://localhost:3000");


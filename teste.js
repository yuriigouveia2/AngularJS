var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

var express = require('express');
var restapi = express();

restapi.get('/data', function(req, res){
    db.all("SELECT * FROM tpessoas", function(err, row){
        console.log(row);
        res.json(row);
    });
});

restapi.post('/data', function(req, res){
    db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
        if (err){
            console.err(err);
            res.status(500);
        }
        else {
            res.status(202);
        }
        res.end();
    });

});


restapi.listen(process.env.PORT || 8080);
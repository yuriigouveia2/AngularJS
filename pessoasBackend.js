var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

var port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var operadoras = [
        {nome: "Oi", codigo: 14, categoria: "Celular"},
        {nome: "Vivo", codigo: 15, categoria: "Celular"},
        {nome: "Tim", codigo: 41, categoria: "Celular"},
        {nome: "GVT", codigo: 25, categoria: "Fixo"},
        {nome: "Embratel", codigo: 21, categoria: "Fixo"}
      ];

var pessoas = [
        {nome:"Yuri", telefone:"987360638", email:"yuri@contato.com",operadora: operadoras[0], cor: "blue"},
        {nome:"Rene", telefone:"956516511", email:"rene@contato.com",operadora: operadoras[1], cor: "yellow"},
        {nome:"Contato", telefone:"981651219", email:"contato@contato.com",operadora: operadoras[2], cor: "red"}
      ];

app.listen(process.env.PORT || port);
console.log('Listening to port ' + port);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/*app.param('id', function(req, res, next, id){
  db.get('SELECT * FROM tpessoas WHERE id = ?', [id], function(err, row){
    if(row){
      req.pessoa = row;
      return next();
    }
    res.status(404).send('Pessoa não encontrada.')
  });
});*/
db.serialize(function (){
  db.run('CREATE TABLE if not exists tpessoas (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(100), telefone VARCHAR(100), email VARCHAR(100))');

  app.get('/pessoas', function(req, res) {
    db.all('SELECT * FROM tpessoas', function(err, rows) {
      if(err) console.log(err);
      console.log(rows);
      pessoas = [];
      for(var i = 0; i < rows.length; i++){
        pessoas.push({nome: rows[i].nome, telefone: rows[i].telefone, email: rows[i].email, operadora: operadoras[0]});
        console.log("row: "+ rows[i]);
      }
      res.json(pessoas);
      console.log(pessoas);
    });
  });

  app.post('/pessoas', function(req, res) {
    pessoas.push(req.body);
    res.json(true);
    db.run('INSERT INTO tpessoas (nome, telefone, email) VALUES (?, ?, ?)', req.body.nome, req.body.telefone, req.body.email, operadoras[0]);
  });

  app.get('/operadoras', function(req, res) {
    res.json(operadoras);
  });
});
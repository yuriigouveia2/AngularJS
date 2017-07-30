var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

var port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(function (){
  db.run('CREATE TABLE if not exists tpessoas (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(100), telefone VARCHAR(100), email VARCHAR(100))');
});

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

app.get('/pessoas', function(req, res) {
  db.get('SELECT * FROM tpessoas', function(err, row) {
    pessoas.push({nome: row.nome, telefone: row.telefone, email: row.email, operadora: operadoras[0]});
    res.json(pessoas);

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



/*var http 	= require('http');
var fs 		= require('fs');
var port 	= "1111" ;

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST,GET',
		'X-Powered-By':'nodejs'
    });
    fs.readFile('pessoas.json', function(err, content){
        response.write(content);
        response.end();
    });
}).listen(port);
console.log("Listening on port " + port );*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.bodyParser());

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

app.listen(process.env.PORT || 8080);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/pessoas', function(req, res) {
  res.json(pessoas);
});

app.post('/pessoas', function(req, res) {
  pessoas.push(req.body);
  res.json(true);
});

app.get('/operadoras', function(req, res) {
  res.json(operadoras);
});
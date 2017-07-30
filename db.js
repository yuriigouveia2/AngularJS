//TESTE
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(function() {

	db.run('CREATE TABLE if not exists tpessoas (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(100), telefone VARCHAR(100), email VARCHAR(100))');
	var stmt = db.prepare('INSERT INTO tpessoas (nome, telefone, email) VALUES (?, ?, ?)');	

	stmt.run('yuri gouveia', '2123132', 'yuri@contato.stf');
	stmt.finalize();

	db.each('SELECT * FROM tpessoas', function(err, row) {
		console.log(row.id + ' ' + row.nome + ' ' + row.telefone + ' ' + row.email);
	});
});
db.close();
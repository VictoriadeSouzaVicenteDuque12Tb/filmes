

import express from 'express';
import mysql2 from 'mysql2';

const app = express();
app.use(express.json());

const tableName = 'filmes_geo_E_Vic';

const db = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})


app.post('/filmes', function (req, res) {
    const nome = req.body.nome;
    const gênero = req.body.gênero;
    const duração = req.body.duração;
    const classificação = req.body.classificação;

    const query = 'INSERT INTO ' + tableName + ' (nome, gênero, duração, classificação) VALUES (?, ?, ?, ?)';

    db.query(query, [nome, gênero, duração, classificação], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Filme adicionado com sucesso!', id: result.insertId });
    });
});


app.get('/filmes', function (req, res) {
    const query = 'SELECT * FROM ' + tableName;

    db.query(query, function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});


app.put('/filmes/:id', function (req, res) {
    const id = req.params.id;
    const nome = req.body.nome;
    const gênero = req.body.gênero;
    const duração = req.body.duração;
    const classificação = req.body.classificação;
    const query = 'UPDATE ' + tableName + ' SET nome = ?, gênero = ?, duração = ?, classificação = ? WHERE id = ?';

    db.query(query, [nome, gênero, duração, classificação, id], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado.' });
        }
        res.status(200).json({ message: 'Filme atualizado com sucesso!' });
    });
});


app.delete('/filmes/:id', function (req, res) {
    const id = req.params.id;
    const query = 'DELETE FROM ' + tableName + ' WHERE id = ?';

    db.query(query, [id], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado.' });
        }
        res.status(200).json({ message: 'Filme deletado com sucesso!' });
    });
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log('Servidor rodando na porta ' + PORT + ' - http://localhost:' + PORT);
});


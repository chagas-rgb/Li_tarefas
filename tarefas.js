const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todas as tarefas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Tarefas ORDER BY ordem_apresentacao';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Criar nova tarefa
router.post('/', (req, res) => {
    const { nome_tarefa, custo, data_limite } = req.body;
    const sql = `INSERT INTO Tarefas (nome_tarefa, custo, data_limite, ordem_apresentacao)
                 VALUES (?, ?, ?, (SELECT IFNULL(MAX(ordem_apresentacao), 0) + 1 FROM Tarefas))`;
    db.query(sql, [nome_tarefa, custo, data_limite], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, nome_tarefa, custo, data_limite });
    });
});

// Editar tarefa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome_tarefa, custo, data_limite } = req.body;
    const sqlCheck = 'SELECT * FROM Tarefas WHERE nome_tarefa = ? AND id != ?';
    db.query(sqlCheck, [nome_tarefa, id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            return res.status(400).json({ error: 'O nome da tarefa já existe' });
        }
        const sql = 'UPDATE Tarefas SET nome_tarefa = ?, custo = ?, data_limite = ? WHERE id = ?';
        db.query(sql, [nome_tarefa, custo, data_limite, id], (err) => {
            if (err) return res.status(500).json(err);
            res.sendStatus(200);
        });
    });
});

// Excluir tarefa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Tarefas WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(200);
    });
});

module.exports = router;

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'todo_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, task });
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

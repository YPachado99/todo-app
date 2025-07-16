const express = require('express');
const app = express();
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: crypto.randomUUID(),
        title: 'Tarea de ejemplo 1',
        description: 'Esta es una descripción',
        completed: false,
        createdAt: new Date()
    }, 
    {
        id: crypto.randomUUID(),
        title: 'Tarea de ejemplo 2',
        description: 'Esta es una descripción',
        completed: false,
        createdAt: new Date()
    }
];

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Servidor Funcando!');
});

// GET para obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

//GET para obtener una tarea por id
app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
});


//POST para crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Título y descripción son obligatorios' });
    }

    const newTask = {
        id: crypto.randomUUID(), // id como string (UUID)
        title,
        description,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});


//PUT para actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id; // ahora es string (UUID)

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const { title, description, completed } = req.body;

    if (title === undefined && description === undefined && completed === undefined) {
        return res.status(400).json({ error: 'Se necesita al menos un campo para actualizar' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});


//DELETE para eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {

    const taskId = parseInt(req.params.id);


    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json(deletedTask);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    {id: 1, title: 'Tarea 1', completed: false},
    {id: 2, title: 'Tarea 2', completed: true},
];

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Servidor Funcando!');
});

//GET para obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

//POST para crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

//PUT para actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);
    
    if(!task){
        return res.status(404).json({ error:"Tarea no encontrada" });
    }

    const { title, completed } = req.body; 

    if (title !== undefined && completed === undefined) {
        return res.status(400).json({ error: 'Se necesita al menos un campo para actualizar' });
    }

    if (title !== undefined){
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

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


import { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import { Link } from 'react-router-dom';


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filtro, setFiltro] = useState('todas');

  // Cargar tareas al iniciar
useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error('Error al cargar tareas:', err));
}, []);

  // Eliminar tarea
const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta tarea?')) return;

    try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            setTasks(prev => prev.filter(t => t.id !== id));
        }
    } catch (err) {
        console.error('Error al eliminar:', err);
    }
};

  // Marcar como completada / pendiente
const handleToggle = async (id, newStatus) => {
    try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: newStatus })
        });

        if (res.ok) {
            setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: newStatus } : t))
        );
        }
    } catch (err) {
        console.error('Error al actualizar tarea:', err);
    }
};

  // Filtro
const tareasFiltradas = tasks.filter(task => {
    if (filtro === 'completadas') return task.completed;
    if (filtro === 'pendientes') return !task.completed;
    return true;
    });

return (
    <div className="container mt-4">
        <h2>Listado de tareas</h2>

        <div className="mb-3">
            <button className="btn btn-outline-secondary me-2" onClick={() => setFiltro('todas')}>Todas</button>
            <button className="btn btn-outline-success me-2" onClick={() => setFiltro('completadas')}>Completadas</button>
            <button className="btn btn-outline-warning" onClick={() => setFiltro('pendientes')}>Pendientes</button>
        </div>
        <Link to="/form" className="btn btn-primary mb-3">
        ➕ Crear nueva tarea
        </Link>

        {tareasFiltradas.length === 0 ? (
        <p>No hay tareas para mostrar.</p>
        ) : (
        <ul className="list-group">
            {tareasFiltradas.map(task => (
            <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
            />
            ))}
        </ul>
        )}
    </div>
);
}

export default TaskList;
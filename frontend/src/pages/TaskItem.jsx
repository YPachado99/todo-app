import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskItem() {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:3000/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => setTask(data))
        .catch(err => console.error('Error:', err));
    }, [id]);

    if (!task) return <p>Cargando tarea...</p>;

    return (
    <div>
        <h2>Tarea #{task.id}</h2>
        <p>Título: {task.title}</p>
        <p>Completada: {task.completed ? '✅ Sí' : '❌ No'}</p>
        <Link to="/" className="btn btn-secondary mt-3">← Volver al listado</Link>
    </div>
    );
}

export default TaskItem;

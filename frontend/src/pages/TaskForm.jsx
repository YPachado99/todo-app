import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function TaskForm() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
    if (id) {
        fetch('http://localhost:3000/api/tasks')
            .then(res => res.json())
            .then(data => {
            const task = data.find(t => t.id === parseInt(id));
            if (task) setTitle(task.title);
            else alert('Tarea no encontrada');
        })
    .catch(err => console.error('Error al cargar tarea:', err));
    }
}, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

    if (title.trim() === '') {
        alert('El título no puede estar vacío');
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/tasks${id ? '/' + id : ''}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({ title })
        });

        if (res.ok) {
            navigate('/'); // volver al listado
        } else {
            const err = await res.json();
            alert(err.error || 'Error al crear tarea');
        }
    } catch (error) {
        console.error('Error al enviar tarea:', error);
    }
};

return (
    <div>
    <h2>{id ? 'Editar tarea' : 'Crear nueva tarea'}</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{id ? 'Guardar cambios' : 'Crear'}</button>
        </form>
</div>
);

}

export default TaskForm;

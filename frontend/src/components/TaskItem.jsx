import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete, onToggle }) {
return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
    <div>
        <input
            type="checkbox"
            className="form-check-input me-2"
            checked={task.completed}
            onChange={() => onToggle(task.id, !task.completed)}
        />
        <Link
            to={`/task/${task.id}`}
            className={`me-3 ${task.completed ? 'text-decoration-line-through text-muted text-decoration-none' : 'text-decoration-none'}`}
        >
        {task.title}
        </Link>
    </div>

    <div>
        <Link to={`/form/${task.id}`} className="btn btn-sm btn-warning me-2">
            ✏️
        </Link>
        <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task.id)}
        >
            🗑️
        </button>
    </div>
    </li>
);
}

export default TaskItem;


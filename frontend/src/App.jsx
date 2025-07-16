import { Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskItem from './pages/TaskItem';


function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskItem />} />
        <Route path="/form" element={<TaskForm />} />
        <Route path="/form/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;

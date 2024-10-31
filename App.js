import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3001/tarefas');
        setTasks(response.data);
    };

    const handleAddTask = async (task) => {
        await axios.post('http://localhost:3001/tarefas', task);
        fetchTasks();
    };

    const handleEditTask = async (task) => {
        await axios.put(`http://localhost:3001/tarefas/${task.id}`, task);
        setEditTask(null);
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        await axios.delete(`http://localhost:3001/tarefas/${id}`);
        fetchTasks();
    };

    return (
        <div className="App">
            <h1>Lista de Tarefas</h1>
            <TaskForm onSubmit={editTask ? handleEditTask : handleAddTask} editTask={editTask} />
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={setEditTask} />
        </div>
    );
}

export default App;


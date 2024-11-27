import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Todos from './Todos';
import EditTodoForm from './EditTodoForm';

const TodoWrapper = () => {
    const [todos, setTodos] = useState(() => {
        // Retrieve todos from localStorage or start with an empty array
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        // Update localStorage whenever todos change
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };

    const toggleCompleted = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleEditTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const updateTodoTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    };

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm
                        key={todo.id}
                        task={todo}
                        editToDo={updateTodoTask}
                    />
                ) : (
                    <Todos
                        key={todo.id}
                        task={todo}
                        toggleCompleted={toggleCompleted}
                        deleteTodo={deleteTodo}
                        editToDo={toggleEditTodo}
                    />
                )
            )}
        </div>
    );
};

export default TodoWrapper;

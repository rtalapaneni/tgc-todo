import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from './todoSlice';
import TodoCards from './TodoCards';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.title);
  };

  const handleUpdateTodo = () => {
    if (editTodoText.trim()) {
      dispatch(updateTodo({ id: editTodoId, title: editTodoText, completed: false }));
      setEditTodoId(null);
      setEditTodoText('');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                />
                <button onClick={handleUpdateTodo}>Save</button>
              </>
            ) : (
              <>
                {todo.title}
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
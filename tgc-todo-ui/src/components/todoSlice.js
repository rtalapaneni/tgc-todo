import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format, parseISO, isValid } from 'date-fns';

const API_URL = 'http://localhost:8080/todos';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.map(todo => ({
      ...todo,
      dueDate: isValid(parseISO(todo.dueDate)) ? format(parseISO(todo.dueDate), 'yyyy-MM-dd') : ''
    }));
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo) => {
    const response = await axios.post(API_URL, {
      ...todo,
      dueDate: format(new Date(todo.dueDate), 'yyyy-MM-dd')
    });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos.deleteTodo',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, {
      ...updatedTodo,
      dueDate: format(new Date(updatedTodo.dueDate), 'yyyy-MM-dd')
    });
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todosSlice.reducer;
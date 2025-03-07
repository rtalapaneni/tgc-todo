import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (title) => {
      const response = await axios.post(API_URL, { title, completed: false });
      return response.data;
    }
  );
  
  export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    }
  );
  
  export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (updatedTodo) => {
      const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
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
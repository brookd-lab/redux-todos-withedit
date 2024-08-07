import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
  name: "1234",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      return state.filter((item, i) => i !== action.payload);
    },
    updateTodos: (state, action) => {
      return state.map((todo, i) => {
        if (i === action.payload.id) {
          var newTodo = {name: action.payload.name};
          return newTodo;
        }
        return todo;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodos, removeTodos, updateTodos } = addTodoReducer.actions;

export const reducer = addTodoReducer.reducer;

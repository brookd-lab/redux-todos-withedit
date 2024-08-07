import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos } from "../features/todos/reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (i) => dispatch(removeTodos(i)),
    updateTodo: (i, obj) => dispatch(updateTodos(i, obj)),
  };
};

const Todos = ({ addTodo, removeTodo, updateTodo, todos }) => {
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const add = () => {

    if (todo === "") {
      alert("Input is Empty");
    } else {
      addTodo({ name: todo });
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const remove = (i) => {
    removeTodo(i);
  };

  const editHandler = (i) => {
    setTodo({name: todos[i].name});
    setEditIndex(i);
    setIsEditing(true);
  };

  const update = () => {
    updateTodo({ id: editIndex, name: todo });
    setTodo("");
    setIsEditing(false);
  }

  const cancel = () => {
    setTodo("");
    setIsEditing(false);
  }

  return (
    <div>

      {/* add */}
      {!isEditing && (
        <div className="addTodos">
          <input type="text" value={todo} onChange={(e) => handleChange(e)} />
          <button onClick={add}>Add</button>
          <p />
        </div>
      )}

      {/* display */}
      {todos.length > 0 &&
        todos.map((item, i) => {
          return (
            <div key={i}>
              <span>{item.name}</span>
              <button onClick={() => remove(i)}>Remove</button>
              <button onClick={() => editHandler(i)}>Edit</button>
            </div>
          );
        })}
      {isEditing && (
        <div>
          <p>Editing</p>
          <input type="text" value={todo.name} onChange={(e) => handleChange(e)} />
          <button onClick={update}>Update</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

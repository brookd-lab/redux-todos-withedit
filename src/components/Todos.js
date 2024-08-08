import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos } from "../features/todos/reducer";
import AddToDo from './AddTodo';

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
  const [todo, setTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const addInputRef = useRef(null);

  const add = () => {
    var todo = addInputRef.current.value;
    if (todo === "") {
      alert("Input is Empty");
    } else {
      addTodo({ name: todo });
      addInputRef.current.value = "";
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
      <AddToDo addInputRef={addInputRef} add={add} />    
        {/* <div className="form-group ms-2">     
          <h4>Add Item</h4><p />
          <div className="input-group mb-4">
            <input className="col-6 me-2 ps-2 rounded" type="text" ref={addInputRef} />
            <button className="btn btn-danger rounded btn-sm col-1" onClick={add}>Add</button>
            <p />
          </div>
        </div> */}


{todos.length > 0 && <h4 className="ms-2">List of Tasks</h4>}
      {/* display */}
      {todos.length > 0 &&
        todos.map((item, i) => {
          return (
            <div className="input-group col-6 mb-2 ms-2" key={i}>
              <div className="form-group col-6 card rounded ps-2 me-2 border">{item.name}</div>
              <button className="btn btn-info btn-sm rounded me-2" onClick={() => remove(i)}>Remove</button>
              <button className="btn btn-success btn-sm rounded" onClick={() => editHandler(i)}>Edit</button>
            </div>
          );
        })
      }


      {isEditing && (
          <div className="ms-2 mt-3">
            <h4>Editing</h4>
            <div className="input-group">
              <input className="form-group rounded me-2 rounded border col-6" type="text" value={todo.name} onChange={(e) => handleChange(e)} />
              <button className="btn btn-info btn-sm me-2 rounded" onClick={update}>Update</button>
              <button className="btn btn-danger btn-sm rounded" onClick={cancel}>Cancel</button>
            </div>
          </div>
      )}
    </div>
  );
};

//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

// import React from 'react'
// import { useState } from 'react';
// import List from './List';
// import './TodoList.css';



// const TodoList = () => {

//     const [inputList, setInputList] = useState("");

//     const [Items, setItems] = useState([]);

//     const [toggleSubmit, setToggleSubmit] = useState(true);

//     const [isEditItem, setIsEditItem] = useState(null);

//     const itemEvent = (e) => {
//         setInputList(e.target.value);
//     };

//     const listOfItems = () => {
//         if (!inputList) {
//             alert("plz fill data");
//         }
//         else if (inputList && !toggleSubmit) {
//             setItems(
//                 Items.map((elem) => {
//                     if (elem.id === isEditItem) {
//                         return { ...elem, text: inputList }
//                     }
//                     return elem;
//                 })

//             )
//             setToggleSubmit(true);

//             setInputList('');

//             setIsEditItem(null);
//         }
//         else {
//             setItems((oldItems) => {
//                 return [...oldItems, inputList];
//             });
//             setInputList('');
//         }

//     };

//     const deleteItems = (id) => {
//         console.log("deleted");

//         setItems((oldItems) => {
//             return oldItems.filter((arrElem, index) => {
//                 return index !== id;
//             });
//         });
//     };

//     const editItem = (id) => {
//         let newEditItem = Items.find((text) => {
//             return text.id === id
//         });
//         console.log(newEditItem);

//         setToggleSubmit(false);

//         setItems(newEditItem);

//         setInputList(newEditItem.text);

//         setIsEditItem(id);
//     }

    
//     return (
//         <div className='main_div'>
//             <div className='center' style={{ textAlign: "center", paddingTop: "20px" }}>
//                 <div className='input'>
//                     <input type="text" value={inputList} placeholder="Add items" onChange={itemEvent} />
//                     {
//                         toggleSubmit ? <button onClick={listOfItems}><i class="fa fa-plus-circle" aria-hidden="true"></i></button> :
//                             <i class="fa fa-pencil-square" aria-hidden="true" title='Update item' onClick={listOfItems} />
//                     }

//                 </div>

//                 <ol style={{ color: "#fff", textAlign: "center", listStyleType: "none" }}>

//                     {/* <li>{inputList}</li> */}
//                     {Items.map((itemval, index) => {
//                         return (

//                             <List
//                                 key={index}
//                                 id={index}
//                                 text={itemval}
//                                 onSelect={deleteItems}
//                                 onClick={editItem}
//                             />
//                         );

//                     })}

//                 </ol>
//             </div>
//         </div>
//     )
// }

// export default TodoList


import React from "react";
import './TodoList.css';


const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

import React, { createContext, useReducer, useState } from "react";
import A from "./A";

const EditData = createContext();

function Reducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case "TOGGLE_TODO":
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload);
        case "EDIT_TODO":
            return state.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        default:
            return state;
    }
}

function TodoList() {

    const [todos, dispatch] = useReducer(Reducer, []);
    const [text, setText] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoText, setEditTodoText] = useState("");
    console.log(todos)
    function handleAddTodo() {
        if (text) {
            dispatch({ type: "ADD_TODO", payload: text });
            setText("");
        }
    }

    function handleToggle(todoId) {
        dispatch({ type: "TOGGLE_TODO", payload: todoId });
    }

    function handleDelete(todoId) {
        dispatch({ type: "DELETE_TODO", payload: todoId });
    }

    function handleEdit(todoId, newText) {
        dispatch({ type: "EDIT_TODO", payload: { id: todoId, text: newText } });
        setEditTodoId(null);
    }

    return (
        <>
            <div className="mt-5" style={{ textAlign: "center" }}>
                <div>
                    <input
                        value={text}
                        style={{ borderRadius: "10px", textAlign: "center" }}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add todos"
                    />
                    <button style={{ borderRadius: "50%" }} className='btn btn-success' onClick={handleAddTodo}><i className="fa fa-plus " title="Add Item" ></i></button>
                </div>
                {todos.map((todo) => (

                    <div key={todo.id} style={{
                        textDecoration: todo.completed ? "line-through" : ""
                    }}
                        onClick={() => handleToggle(todo.id)}
                    >
                        {editTodoId === todo.id ? (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        style={{ borderRadius: "10px", textAlign: "center" }}
                                        value={editTodoText}
                                        onChange={(e) => setEditTodoText(e.target.value)}
                                    />
                                    <button className="btn btn-primary" style={{ borderRadius: "50%" }} onClick={() => handleEdit(todo.id, editTodoText)}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Item" /></button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}></span>
                                <div>{todo.text}</div>
                                <div>
                                    <button className="btn btn-primary" style={{ borderRadius: "50%", marginRight: "5px" }} onClick={() => setEditTodoId(todo.id)}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Item" /></button>
                                    <button className="btn btn-danger" style={{ borderRadius: "50%", marginLeft: "5px" }} onClick={() => handleDelete(todo.id)}><i className="fa fa-trash-o" title="Delete Item" ></i></button>
                                </div>

                            </div>
                        )}
                    </div>

                ))}

            </div>
            <EditData.Provider value={todos}>
                <A />
            </EditData.Provider>

        </>
    );
}
export default TodoList
export { EditData }
import React, { useState, useEffect } from 'react'



// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const TodoList = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }


    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }

    // edit the item
    //     When user clikc on edit button 

    // 1: get the id and name of the data which user clicked to edit
    // 2: set the toggle mode to change the submit button into edit button
    // 3: Now update the value of the setInput with the new updated value to edit. 
    // 4: To pass the current element Id to new state variable for reference 


    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }


    // remove all 
    const removeAll = () => {
        setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div" style={{ textAlign: "center", backgroundColor: "#D7E5F4", display: "flex", justifyContent: "center", padding: "50px 0 ", height: "42rem" }}>
                <div className="child-div">
                    <div>
                        <h1>Todo List</h1>
                    </div>

                    <div className="addItems">
                        <input style={{borderRadius:"10px",textAlign:"center"}}
                            type="text" placeholder="Add Items"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)
                            }
                        />
                        {
                            toggleSubmit ? <button style={{backgroundColor:"#000",color:"#fff",borderRadius:"50%",width:"50px",height:"30px"}}><i className="fa fa-plus "  title="Add Item" onClick={addItem}></i></button> :
                                <button style={{backgroundColor:"#000",color:"#fff",borderRadius:"50%",width:"50px",height:"30px"}}><i className="fa fa-pencil" title="Update Item" onClick={addItem}></i></button>

                        }

                    </div>

                    <div className="showItems">

                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id} style={{backgroundColor:"#000",display:"flex",justifyContent:"space-between",borderRadius:"5px",margin:"10px 0 5px"}}>
                                        <h3 style={{color:"#fff",padding:"5px"}}>{elem.name}</h3>
                                        <div className="todo-btn" style={{padding:"5px"}}>
                                            <button style={{backgroundColor:"#000",color:"#fff",textAlign:"center"}}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Item" onClick={() => editItem(elem.id)}></i></button>
                                            <button style={{backgroundColor:"#000",color:"#fff",textAlign:"center"}}><i className="fa fa-trash-o" title="Delete Item" onClick={() => deleteItem(elem.id)}></i></button>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>

                    {/* clear all button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} style={{backgroundColor:"#000",color:"#fff",margin:"10px 0"}}><span> CLEAR LIST </span> </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;



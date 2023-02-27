import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './component/About';
import TodoList from './component/TodoList';
import Contact from './component/Contact';
import Home from './component/Home';
import Notfound from './component/Notfound';
import Product from './component/Product';
import Form from './component/Form';
import Task from './component/Task';
import Reactform from './component/useForm/Reactform';
// import Usereducer from './Usereducer';
import EditData from './component/Editdataform/Editdata';
import FormHook from './Editform';


const App = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", background: "#000", padding: "20px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>Home</span></Link>
        <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>About</span></Link>
        <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>Contact</span></Link>
        <Link to="/product" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>Product</span></Link>
        <Link to="/todo" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>TODO List</span></Link>
        <Link to="/form" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>Form</span></Link>
        <Link to="/task" style={{ color: "#fff", textDecoration: "none" }}><span style={{padding:"10px"}}>Task</span></Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}>
          <Route path=":id" element={<About/>}></Route>
        </Route>
        <Route path='/contact' element={<Contact />}>
          <Route path=":id" element={<Contact />}></Route>
        </Route>
        <Route path='/product' element={<Product />}>
          <Route path=":id" element={<Product />}></Route>
        </Route>
        <Route path='/todo' element={<TodoList/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/task' element={<Task/>}>
          <Route path=':id' element={<Task/>}></Route>
        </Route>
        <Route path='/reactform' element={<Reactform/>}></Route>
        <Route path='/editdata' element={<EditData/>}></Route>
        <Route path='/editform' element={<FormHook/>}></Route>
        
        {/* <Route path='/product/:id' element={<Prod />}></Route> */}
        <Route path='/*' element={<Notfound />}></Route>
      </Routes>

    </>
  );
};

export default App;
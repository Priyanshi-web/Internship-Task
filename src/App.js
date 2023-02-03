import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './About';
import TodoList from './TodoList';
import Contact from './Contact';
import Home from './Home';
import Notfound from './Notfound';
import Product from './Product';


const App = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", background: "#000", padding: "20px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
        <Link to="/product" style={{ color: "#fff", textDecoration: "none" }}>Product</Link>
        <Link to="/todo" style={{ color: "#fff", textDecoration: "none" }}>TODO List</Link>
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
        {/* <Route path='/product/:id' element={<Prod />}></Route> */}
        <Route path='/*' element={<Notfound />}></Route>
      </Routes>

    </>
  );
};

export default App;
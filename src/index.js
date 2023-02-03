import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import About from './About';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById("root")
);

// ReactDOM.render(<About/>, document.getElementById("root"));
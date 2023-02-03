import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Contact = () => {

  const { id } = useParams();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Contact</h1>
      <div style={{ textAlign: "center" }}>
        <Link to="/Contact/1">Contact 1</Link><br/>
        <Link to="/Contact/2">Contact 2</Link><br/>
        <h1>Contact {id} </h1>
      </div>
    </>
  );
};

export default Contact;

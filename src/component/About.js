import React from 'react';
import { Link, useParams } from 'react-router-dom';

const About = () => {

  const { id } = useParams()


  return (
    <>

      <h1 style={{ textAlign: "center" }}>About</h1>

      <div style={{ textAlign: "center" }}>
        <Link to="/About/1">User 1</Link><br />
        <Link to="/About/2">User 2</Link><br />
        <h1>user {id}</h1>
      </div>
    </>
  );
};

export default About;
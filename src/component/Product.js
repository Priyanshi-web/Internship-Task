import React from 'react';
import { Link, useParams } from 'react-router-dom';



const Product = () => {

    const { id } = useParams();

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Product</h1>
            {/* <h1>{f}</h1> */}
            <div style={{ textAlign: "center" }}>
                <Link to="/Product/1">Product 1</Link><br></br>
                <Link to="/Product/2">Product 2</Link><br></br>
                <h1>Product { id }</h1>
            </div>
        </>
    );
};

export default Product;

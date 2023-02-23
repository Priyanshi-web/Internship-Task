import React, { useState } from 'react'
import Append from './Append';

const Appendbtn = () => {

    const [formCount, setFormCount] = useState(0);

    const handleAddForm = () => {
        setFormCount(prevCount => prevCount + 1);
    };

    const forms = [];

    for (let i = 0; i < formCount; i++) {
        forms.push(
            // <form key={i} onSubmit={handleSubmit(onSubmit)}>

            // </form>
            <Append key={i} />
        );
    }
    return (
        <div>
            <div>
                {forms}
                <button className='my-2 btn btn-primary p-4' onClick={handleAddForm}>Append new form</button>
            </div>
        </div>
    )
}

export default Appendbtn

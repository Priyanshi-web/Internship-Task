import React from 'react'
import { Link } from 'react-router-dom'
import Usereducer from './usereducer/Usereducer'
import Reactform from './useForm/Reactform';

const Task = () => {

    return (
        <>
            {/* <div style={{ textAlign: "center" }}>
                <Link to="/Usereducer">Task 6</Link>
            </div>
            <Routes>
                <Route path='/usereducer' element={<Usereducer />}></Route>
            </Routes> */}
            <div style={{ textAlign: "center" }}>
                <Link to="/reactform">Reactform</Link><br />
                <Link to="/editdata">Edit Form Data</Link><br />
            </div>
            <Usereducer />
        </>
    )
}

export default Task

import React , { useContext } from 'react'
import { EditData } from '../usereducer/Usereducer'

const C = () => {
    const editdata = useContext(EditData)
    return (
        <div>
        {
            editdata.map((todo) => (
                <div key={todo.id}>
                    <h5>{todo.text}</h5>
                </div>
            ))
        }
        </div>

    )
}

export default C

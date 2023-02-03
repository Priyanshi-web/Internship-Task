import React from 'react'
import { useState } from 'react';

const List = (props) => {

    const [line, setLine] = useState(false);

    const cutIt = () => {
        setLine(true);
    };

    return (
        <div>
            <div>
                {/* <span onClick={cutIt}> */}
                <span>
                    <i className='deleteIcon fa fa-times' aria-hidden="true"
                    style={{padding:"10px"}}
                        onClick={() => {
                            props.onSelect(props.id);
                        }} />

                    <i class="fa fa-pencil-square" aria-hidden="true"
                    style={{padding:"10px"}}
                        onClick={() => {
                            props.onClick(props.id);
                        }} />
                </span>
                <li style={{ textDecoration: line ? "line-through" : "none" }}>{props.text}</li>
            </div>
        </div>
    )
}

export default List

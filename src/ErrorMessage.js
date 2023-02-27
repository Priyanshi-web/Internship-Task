import React from 'react'

const Errormessage = (props) => {
  return (
    <div className='invalid-feedback'>{props.errormessage}</div>
  )
}

export default Errormessage
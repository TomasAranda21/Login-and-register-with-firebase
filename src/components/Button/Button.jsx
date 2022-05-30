import React from 'react'

const Button = ({text}) => {
  return (
    <button className='bg-blue-500 text-white rounded-sm p-2 uppercase font-bold' type='submit'>{text}</button>
  )
}

export default Button
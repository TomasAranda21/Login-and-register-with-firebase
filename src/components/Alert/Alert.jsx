import React from 'react'

const Alert = ({text, error}) => {
  return (
    <p className={`p-2 border ${error ? 'border-red-600 text-red-600 bg-red-200 ' : 'border-blue-500 text-blue-800 bg-blue-100 '} text-center uppercase text-sm font-semibold`}>{text}</p>
  )
}

export default Alert
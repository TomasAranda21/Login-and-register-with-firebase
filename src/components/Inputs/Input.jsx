import React from 'react'

const Input = ({type, placeholder, onChange, value, touched}) => {
  return (

      <div className="grid">
        <label htmlFor={type} className=' capitalize font-medium'>{type}</label>
        <input 
        type={type} 
        touched={touched}
        placeholder={placeholder}
        name={type}
        onChange={onChange}
        id={type}
        value={value}
        className='text-black p-2 bg-slate-50 border-2 shadow-md'
        />
      </div>

  )
}

export default Input
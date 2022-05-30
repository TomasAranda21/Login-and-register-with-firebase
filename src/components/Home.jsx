import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Home = () => {

  const { user, logOut, loading} = useAuth()

  const navigate = useNavigate()


  const handleLogOut = async () => {

    try {
      
      await logOut()
  
      navigate('/login')
    } catch (error) {

      console.log(error)
      
    }
  }

  return (

    <div className="mx-auto my-auto shadow-lg bg-slate-800 text-white p-5 md:px-32 py-20 rounded-md flex flex-col gap-10">

      <h1 className="text-xl font-semibold">Hello {user.email}</h1>
  
      <button className="shadow-xl bg-gray-100 text-black font-bold uppercase p-2 rounded-sm" onClick={handleLogOut}>sign Out</button>

    </div>

    
    
  )
}

export default Home
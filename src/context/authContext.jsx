import React, {createContext, useEffect, useState} from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword ,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail

} from 'firebase/auth'

import {auth} from '../firebase'

const authContext = createContext()



export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

    useEffect(() => {

      onAuthStateChanged(auth, currentUser => {

        setUser(currentUser)

        setLoading(false)
      })


    }, [])


    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)


    const logOut = () => {
      const logOutSession = confirm('Are you sure you want to log out?')

      if(logOutSession){

        signOut(auth)

        return

      }
    
    }

    const loginWithGoogle = () => {

      const googleProvider = new GoogleAuthProvider()

      return signInWithPopup(auth, googleProvider)

    }


    const resetPassword = (email) => sendPasswordResetEmail(auth, email)
    
    

  return (

    <authContext.Provider
    value={{
        signUp,
        login,
        user,
        logOut,
        loading,
        loginWithGoogle,
        resetPassword


    }}
    >

        {children}
    </authContext.Provider>


  )
}

export default authContext
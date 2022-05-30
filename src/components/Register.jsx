import React, {useState} from 'react'
import {Formik} from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import Alert from './Alert/Alert'
import Input from './Inputs/Input'
import Button from './Button/Button'
import useAuth from '../hook/useAuth'
import InputError from './Alert/InputError'

const Register = () => {

    const { signUp } = useAuth()
    const [alert, setAlert] = useState({})

    const navigate = useNavigate()

  return (
        <>
    
    <div className="p-5 my-auto mx-auto ">


        <div className="bg-white md:p-14 p-8 px-10 md:px-20 rounded-sm shadow-xl">
          
          <Formik
          initialValues={{
              email: '',
              password: '',
          }}
    
          validate= {({email, password}) => {
    
              const errors = {};
    
              if(!email) {
                  errors.email = 'Please enter your email'
              }
    
              if(!password) {
                  errors.password = 'Please enter a password'
              }
    
              return errors
    
          }}
    
          onSubmit={async (values, {resetForm}) => {
            const {email, password} = values
    
    
            setAlert({})
    
            try {
                
                await signUp(email, password)
        
                navigate('/')
    
            } catch (error) { 
    
                if(error.code === "auth/invalid-email"){
    
                    setAlert({
                        msg: "Email invalidate",
                        error: true
                    })
                }
                if(error.code === "auth/weak-password"){
    
                    setAlert({
                        msg: "Password should be at least 6 characters",
                        error: true
                    })
                }
                if(error.code === "auth/email-already-in-use"){
    
                    setAlert({
                        msg: "the email entered is already registered",
                        error: true
                    })
                }
                
                
            }
        }}
          
          >
    
              {({values, handleChange, handleSubmit, handleBlur, errors, touched}) => (
                <>
                  <h1 className='text-xl text-center uppercase font-bold text-orange-500 mb-10 md:mx-20 underline'>Register</h1>
    
                  
                  <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  {alert.msg && <Alert text={alert.msg} error={alert.error}/>}


                  <div>

                      <Input 
                      type='email'
                      onChange={handleChange}
                      touched={touched}
                      value={values.email}
                      placeholder='yourEmail@company.com'/>
                      {errors.email && touched.email && <InputError text={errors.email}/>}
                  </div>
                      
    
                <div>

                      <Input 
                      type='password'
                      touched={touched}
                      onChange={handleChange}
                      value={values.password}
                      />
                      {errors.password && touched.password && <InputError text={errors.password}/>}

                </div>
    
    
                      <Button text='register'/>
                  </form>
                
                </>
    
              )}
    
          </Formik>
            
            <div className="text-center mt-2">
              <p>You have account? </p>
              {<Link to='/login' className="underline">Login</Link>}
            </div>
    
        </div>
    </div>
        
        </>
      )
}

export default Register


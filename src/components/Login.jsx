import React, {useState} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert/Alert'
import Input from './Inputs/Input'
import Button from './Button/Button'
import useAuth from '../hook/useAuth'
import google from '../assets/google.png'
import InputError from './Alert/InputError'


const Login = () => {

    const { login, loginWithGoogle } = useAuth()
    const [alert, setAlert] = useState({})

    const navigate = useNavigate()

    const handleLoginGoogle = async () => {
      try {
        
        await loginWithGoogle()
        navigate('/')

      } catch (error) {
        
        console.log(error)
      }

    }

   



  return (
    <>

    <div className="p-5 my-auto mx-auto ">

      <div className="bg-white md:p-14 p-10 py-10 rounded-sm shadow-xl">
        
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
                
                await login(email, password)
        
                navigate('/')

            } catch (error) { 

              if(error.code === 'auth/user-not-found') {
                  setAlert({
                    msg: "The user dont exist",
                    error: true

                  })

                  return

              }

              if(error.code === 'auth/wrong-password'){
                setAlert({
                  msg: "The password is incorrect",
                  error: true
                })

                return

              }
              
            }
        }}
        
        >

            {({values, handleChange, handleSubmit, handleBlur, errors, touched}) => (
              <>
                <h1 className='text-xl text-center uppercase font-bold text-orange-500 mb-10 sm:mx-20 underline'>Login</h1>

                
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

                  
                    <Button text='Sing In'/>
                </form>
              
              </>



            )}

        </Formik>
          
          <div className="text-center mt-2 flex flex-col gap-3">
            <Link to="/forgot-password" className="mt-2 font-bold text-sm text-gray-500 hover:cursor-pointer hover:text-blue-500 uppercase">Forgot your password?</Link>

            <div>
              <p className="">You dont have account? </p>
              {<Link to='/register' className="underline">Register</Link>}
            </div>
          </div>

          <button type="button" className="bg-white shadow-lg rounded-sm p-5 text-center flex gap-5 mt-5 items-center mx-auto" onClick={handleLoginGoogle}>
          <img src={google} alt="" width={30} />
            
            Sign in with Google
            
            </button>

      </div>
    </div>
    
    </>
  )
}

export default Login
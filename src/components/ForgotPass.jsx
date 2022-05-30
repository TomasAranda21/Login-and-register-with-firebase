
import React, {useState} from 'react'
import {Formik} from 'formik'
import Alert from './Alert/Alert'
import Input from './Inputs/Input'
import Button from './Button/Button'
import useAuth from '../hook/useAuth'
import InputError from './Alert/InputError'
import { Link } from 'react-router-dom'



const ForgotPass = () => {

    const { resetPassword } = useAuth()
    const [alert, setAlert] = useState({})

  return (
    <>

    <div className="mx-auto my-auto p-5">

        <div className="bg-white md:p-14 p-10 md:px-20 rounded-sm shadow-xl">
        
        <Formik
        initialValues={{
            email: '',
        }}

        validate= {({email, password}) => {

            const errors = {};

            if(!email) {
                errors.email = 'Please enter your email'
            }

            return errors

        }}

        onSubmit={async (values, {resetForm}) => {
            const {email} = values


            setAlert({})

            try {
                
                await resetPassword(email)
                setAlert({

                    msg: 'we send you an email with a link to reset your password',
                    error: false

                })
        
            } catch (error) { 


                if(error.code === 'auth/user-not-found') {
                    setAlert({
                    msg: "the email was not registered",
                    error: true
                    })

                    return

                }

            }
        }}
        
        >

            {({values, handleChange, handleSubmit, handleBlur, errors, touched}) => (
                <>
                <h1 className='text-xl text-center uppercase font-bold text-orange-500 mb-10 underline'>Recover your password with firebase</h1>

                
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
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


                    <Button text='send instructions'/>
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

export default ForgotPass



   

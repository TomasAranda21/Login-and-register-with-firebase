import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPass from './components/ForgotPass'
import {AuthProvider} from './context/authContext'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <BrowserRouter>
      


        <div className="bg-slate-200 h-screen text-black flex">
        <AuthProvider>

            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                <Home/>
    
                </ProtectedRoute>
              }/>
            
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/forgot-password" element={<ForgotPass/>}/>
            </Routes>
          
        </AuthProvider>
        </div>



    </BrowserRouter>
  )
}

export default App

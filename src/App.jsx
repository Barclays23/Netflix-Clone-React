import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuth from './components/RedirectIfAuth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/footer'



function App() {
   return (
      <>
         <AuthContextProvider>
            <ToastContainer position="top-center" theme="dark" autoClose={3000} />
            <Navbar />
            <Routes>
               <Route path='/' element={<Home/>}>  </Route>
               {/* <Route path='/login' element={<Login/>}>  </Route> */}
               {/* <Route path='/register' element={<SignUp/>}>  </Route> */}
               <Route path='/login' element={<RedirectIfAuth> <Login /> </RedirectIfAuth> }>  </Route>
               <Route path='/register' element={<RedirectIfAuth> <SignUp /> </RedirectIfAuth> }>  </Route>
               <Route path='/profile' element={ <ProtectedRoute> <Profile/> </ProtectedRoute>}>  </Route>
            </Routes>
            <Footer />
         </AuthContextProvider>
      </>
   );
}

export default App

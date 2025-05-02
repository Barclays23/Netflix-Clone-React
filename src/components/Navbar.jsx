import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

function Navbar() {
   const {user, logOut} = userAuth()
   const navigate = useNavigate()

   const handleLogout = async () => {
      try {
         await logOut();
         navigate('/');
      } catch (error) {
         console.log('error in handleLogout :' , error);
      }
   }
   

   return (
      <div className='navbar-container fixed w-full p-4 flex items-center justify-between z-50 bg-gradient-to-b from-black'>
         <div className='netflix-logo'>
            <Link to={'/'}> <h1 className='uppercase text-red-600 cursor-pointer text-5xl font-bold'>MyFlix</h1> </Link>
         </div>

         {user && user.email ? (
            <div>
               <Link to={'/profile'}> <button className='capitalize pr-4 cursor-pointer'> Profile </button> </Link>
               <button onClick={handleLogout} className='capitalize px-6 py-2 bg-red-600 rounded cursor-pointer'> Logout </button>
            </div>
         ) : (
            <div>
               <Link to={'/login'}> <button className='capitalize px-6 py-2 pr-4 rounded cursor-pointer hover:text-red-600'> Login </button> </Link>
               <Link to={'/register'}> <button className='capitalize px-6 py-2 bg-red-600 rounded cursor-pointer'> Sign Up </button> </Link>
            </div>
         )}

      </div>
   )
}

export default Navbar
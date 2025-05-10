import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';



function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);
   
   const { logOut, user } = userAuth();
   const navigate = useNavigate();


   const handleLogout = async () => {
      try {
         await logOut();
         toast.success("You have successfully signed out!");
         navigate('/');
         setMenuOpen(false); // close menu on logout
      } catch (error) {
         console.log('error in handleLogout :', error);
      }
   };


  
   return (
      <div className='navbar-container fixed w-full p-4 flex items-center justify-between z-50 bg-gradient-to-b from-black'>
         <div className='netflix-logo'>
         <Link to={'/'}>
            <h1 className='uppercase text-red-600 cursor-pointer text-3xl md:text-5xl font-bold'>
               MyFlix
            </h1>
         </Link>
         </div>

         {/* Hamburger icon for mobile */}
         <div className='md:hidden'>
         <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-white focus:outline-none'
         >
            {menuOpen ? (
               <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
               </svg>
            ) : (
               <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
               </svg>
            )}
         </button>
         </div>

         {/* Desktop menu */}
         <div className='hidden md:flex space-x-4 items-center'>
         {user && user.email ? (
            <>
               <Link to={'/profile'}>
               <button className='capitalize cursor-pointer'>Profile</button>
               </Link>
               <button
               onClick={handleLogout}
               className='capitalize px-4 py-2 bg-red-600 rounded cursor-pointer'
               >
               Logout
               </button>
            </>
         ) : (
            <>
               <Link to={'/login'}>
               <button className='capitalize px-4 py-2 rounded cursor-pointer hover:text-red-600'>
                  Login
               </button>
               </Link>
               <Link to={'/register'}>
               <button className='capitalize px-4 py-2 bg-red-600 rounded cursor-pointer'>
                  Sign Up
               </button>
               </Link>
            </>
         )}
         </div>

         {/* Mobile dropdown menu */}
         {menuOpen && (
            <div className='absolute top-11 right-0 w-1/2 max-w-[220px] bg-black/55 flex flex-col items-center space-y-3 py-2 rounded-l-lg md:hidden shadow-lg transform transition-transform duration-300 ease-in-out'
                  style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
               {user && user.email ? (
                  <>
                  <Link to={'/profile'} onClick={() => setMenuOpen(false)} className='w-full px-1 my-0.5'>
                     <button className='capitalize w-full px-4 py-2 bg-gray-200 text-black rounded hover:bg-red-600 hover:text-white transition cursor-pointer'>
                        Profile
                     </button>
                  </Link>
                  <div className='w-full px-1 my-0.5'>
                     <button
                        onClick={handleLogout}
                        className='capitalize w-full px-4 py-2 bg-gray-200 text-black rounded hover:bg-red-600 hover:text-white transition cursor-pointer'
                     >
                        Logout
                     </button>
                  </div>
                  </>
               ) : (
                  <>
                  <Link to={'/login'} onClick={() => setMenuOpen(false)} className='w-full px-1 my-0.5'>
                     <button className='capitalize w-full px-4 py-2 bg-gray-200 text-black rounded hover:bg-red-600 hover:text-white transition cursor-pointer'>
                        Login
                     </button>
                  </Link>
                  <Link to={'/register'} onClick={() => setMenuOpen(false)} className='w-full px-1 my-0.5'>
                     <button className='capitalize w-full px-4 py-2 bg-gray-200 text-black rounded hover:bg-red-600 hover:text-white transition cursor-pointer'>
                        Sign Up
                     </button>
                  </Link>
                  </>
               )}
            </div>
         )}

      </div>
   );

}

export default Navbar;

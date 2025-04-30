import React, { useEffect, useState } from 'react'
import { signUpPageBGUrl } from '../services/movieServices'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify'





function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberLogin, setRememeberLogin] = useState(false)

   const {user, logIn} = userAuth()
   const navigate = useNavigate()
   // const MySwal = withReactContent(Swal)



   const HandleFormSubmit = async (event)=>{
      event.preventDefault()
      // console.log(email, password);
      try {
         await logIn(email, password, rememberLogin)
         toast.success("Login successful!")
         navigate('/')

      } catch (error) {
         console.log('error in login HandleFormSubmit :', error)
         toast.error(error.message || "Login failed. Please try again.")
      }
   }

   useEffect(() => {
      const saved = localStorage.getItem('rememberLogin');
      const savedEmail = localStorage.getItem('email');

      if (saved === 'true' && savedEmail) {
         setRememeberLogin(true);
         setEmail(savedEmail);
      }
   }, []);
   
   useEffect(() => {
      if (rememberLogin) {
         localStorage.setItem('rememberLogin', true);
         localStorage.setItem('email', email);
      } else {
         localStorage.removeItem('rememberLogin');
         localStorage.removeItem('email');
      }
   }, [rememberLogin, email]);


   return (
      <>
         <div className='w-full h-screen'>
            <img 
               className='hidden sm:block w-full h-full absolute object-cover'
               src={signUpPageBGUrl} 
               alt="Background Image"
            />

            <div className='backdrop bg-black/70 fixed top-0 left-0 w-full h-screen'></div>

            <div className='fixed w-full px-4 py-24 z-20'>
               <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
                  <div className='max-w-[320px] mx-auto py-16'>
                     
                     <h1 className='text-3xl font-bold'>Sign In</h1>

                     <form onSubmit={HandleFormSubmit} className='w-full flex flex-col py-4'>
                        <input 
                           type='email' 
                           className='p-3 my-2 bg-gray-700 rounded' 
                           placeholder='email' 
                           autoComplete='email'
                           value={email}
                           onChange={(e)=> setEmail(e.target.value)}
                        />
                        <input
                           type='password'
                           className='p-3 my-2 bg-gray-700 rounded'
                           placeholder='password'
                           autoComplete='current-password'
                           value={password}
                           onChange={(e)=> setPassword(e.target.value)}
                        />
                        <button className='bg-red-600 py-3 my-6 rounded font-bold cursor-pointer'>Login</button>
                        
                        <div className='flex justify-between items-center text-gray-600'>
                           <p>
                              <input type="checkbox" className='mr-2 cursor-pointer' 
                                 checked={rememberLogin}
                                 onChange={(e)=> setRememeberLogin(!rememberLogin)}
                              />
                              Remember Me
                           </p>
                           <p>Need Help?</p>
                        </div>
                        <p>
                           <span className='text-gray-600 mr-2'> New to Netflix?</span>
                           <Link to={'/register'}> Sign Up </Link>
                        </p>
                     </form>

                  </div>
               </div>
            </div>

         </div>
      </>
   )
}

export default Login
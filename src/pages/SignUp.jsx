import React, { useState } from 'react'
import { signUpPageBGUrl } from '../services/movieServices'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

import { toast } from 'react-toastify'



function SignUp() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberLogin, setRememeberLogin] = useState(false)
   // console.log(rememberLogin)

   const { user, signUp } = userAuth();

   const navigate = useNavigate()

   const HandleFormSubmit = async (event)=>{
      event.preventDefault()
      // console.log(email, password);
      try {
         await signUp(email, password)
         toast.success("Signup successful! 🎉 You're now a member!")
         navigate('/')
      } catch (error) {
         console.log('error in signup HandleFormSubmit :', error)
         toast.error(error.message || "Registration failed. Please try again.")
      }
   }

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
                     <h1 className='text-3xl font-bold'>Sign Up</h1>

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
                        <button className='bg-red-600 py-3 my-6 rounted font-bold'>Sign Up</button>
                        
                        <div className='flex justify-between items-center text-gray-600'>
                           <p>
                              <input type="checkbox" className='mr-2' 
                                 checked={rememberLogin}
                                 onChange={(e)=> setRememeberLogin(!rememberLogin)}
                              />
                              Remember Me
                           </p>
                           <p>Need Help?</p>
                        </div>
                        <p>
                           <span className='text-gray-600 mr-2'> Already subscribed to Netflix?</span>
                           <Link to={'/login'}> Sign In </Link>
                        </p>
                     </form>

                  </div>
               </div>
            </div>

         </div>
      </>
   )
}

export default SignUp
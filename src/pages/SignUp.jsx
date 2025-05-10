import React, { useState } from 'react'
import { signUpPageBGUrl } from '../services/movieServices'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

import { toast } from 'react-toastify'

import Spinner1 from '../components/Spinner1'
import Spinner2 from '../components/Spinner2'



function SignUp() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [agreeTerms, setAgreeTerms] = useState(false)

   // this loading for form loading. another loading(authLoading) for auth checking
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   

   const { signUp, user, loading: authLoading } = userAuth();

   const navigate = useNavigate()

   const handleSignupSubmit = async (event)=>{
      event.preventDefault()
      setLoading(true);

      // Confirm password validation
      if (password !== confirmPassword) {
         toast.error("Passwords do not match. Please confirm your password!");
         setLoading(false);
         return;
      }

      // Terms and Conditions validation
      if (!agreeTerms) {
         toast.warning("You must agree to the terms and conditions.");
         setLoading(false);
         return;
      }

      try {
         await signUp(email, password)
         toast.success("Signup successful! 🎉 You're now a member!")
         navigate('/')
      } catch (error) {
         console.log('error code in signup HandleFormSubmit :', error.code)
         const message = getErrorMessage(error.code);
         setErrorMessage(message);
         toast.error(message);
      } finally {
         setLoading(false);
      }
   }

   // Helper function to map Firebase error codes to user-friendly messages
   const getErrorMessage = (errorCode) => {
      switch (errorCode) {
      case 'auth/email-already-in-use':
         return 'This email address is already in use.';
      case 'auth/invalid-email':
         return 'The email address is invalid.';
      case 'auth/weak-password':
         return 'The password is too weak. It should be at least 6 characters.';
      case 'auth/missing-email':
         return 'Please enter an email address.';
      case 'auth/missing-password':
         return 'Please enter a password.';
      case 'auth/operation-not-allowed':
         return 'Email/password accounts are not enabled.';
      case 'auth/invalid-phone-number':
         return 'The phone number is invalid.';
      default:
         return 'An unknown error occurred. Please try again.';
      }
   }





   // Show spinner while checking auth || form loading
   if (loading || authLoading) {
      // return <Spinner1 />;
      return <Spinner2 />;
   }



   return (
      <>
         <div className='w-full h-full relative'>
            <img 
               className='w-full h-full absolute object-cover'
               src={signUpPageBGUrl} 
               alt="Background Image"
            />

            <div className='backdrop absolute w-full h-full bg-black/30'></div>
            <div className='backdrop absolute w-full h-full bg-gradient-to-t from-black/97 z-10' />

            <div className='relative w-full h-full px-4 pt-23 pb-17 z-20'>
               <div className='max-w-[450px] w-full mx-auto bg-black/80 rounded-lg px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16'>
                  <div className='max-w-[320px] w-full mx-auto'>
                     <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Sign Up</h1>

                     <form onSubmit={handleSignupSubmit} className='w-full flex flex-col space-y-4'>
                        <input 
                           type='email' 
                           className='p-3 sm:p-3 bg-gray-700 rounded' 
                           placeholder='email' 
                           autoComplete='email'
                           value={email}
                           onChange={(e)=> setEmail(e.target.value)}
                        />

                        <input
                           type='password'
                           className='p-3 sm:p-3 bg-gray-700 rounded'
                           placeholder='password'
                           autoComplete='current-password'
                           value={password}
                           onChange={(e)=> setPassword(e.target.value)}
                        />

                        <input
                           type='password'
                           className='p-3 sm:p-3 bg-gray-700 rounded'
                           placeholder='confirm password'
                           autoComplete='new-password'
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div className='flex justify-between items-center text-gray-600 text-sm mt-5'>
                           <label className='flex items-center cursor-pointer'>
                              <input
                                 type="checkbox"
                                 className='mr-2'
                                 checked={agreeTerms}
                                 onChange={(e) => setAgreeTerms(!agreeTerms)}
                              />
                              Agree to Terms
                           </label>
                           <p>Need Help?</p>
                        </div>

                        <button className='bg-red-600 hover:bg-green-500 py-3 sm:py-4 rounded font-bold cursor-pointer'>
                           Sign Up
                        </button>

                        <p className='text-md'>
                           <span className='text-gray-600 mr-2'>Already subscribed to Netflix?</span>
                           <Link to={'/login'} className='hover:text-red-600'>Sign In</Link>
                        </p>

                        <p className='text-center text-md mt-4'>
                           <Link to='/' className='hover:text-red-600'>← Back to Home</Link>
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
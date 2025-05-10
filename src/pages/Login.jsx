import React, { useEffect, useState } from 'react'
import { signUpPageBGUrl } from '../services/movieServices'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify'

import Spinner1 from '../components/Spinner1'
import Spinner2 from '../components/Spinner2'





function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberLogin, setRememeberLogin] = useState(false)
   const [showResetForm, setShowResetForm] = useState(false)

   // this loading for form loading. another loading(authLoading) for auth checking
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');


   const {logIn, resetPassword, user, loading: authLoading} = userAuth()
   const navigate = useNavigate()


   const handleLoginFormSubmit = async (event)=>{
      event.preventDefault()
      setLoading(true);

      try {
         await logIn(email, password, rememberLogin)
         toast.success("Login successful!")
         navigate('/')

      } catch (error) {
         console.log('error code in login HandleFormSubmit :', error.code)
         const message = getErrorMessage(error.code);
         setErrorMessage(message);
         toast.error(message);
      } finally {
         setLoading(false);
      }
   }

   const handleResetPassword = async (event) => {
      event.preventDefault()
      setLoading(true)

      try {
         await resetPassword(email)
         toast.success('Password reset link has been sent to your email. Check your inbox.')
         setTimeout(() => {
            setShowResetForm(false)
         }, 2000);
      } catch (error) {
         console.log('resetPassword error:', error);
         const message = getErrorMessage(error.code)
         toast.error(message)
      } finally {
         setLoading(false)
      }
   }


   // Helper function to map Firebase error codes to user-friendly messages
   const getErrorMessage = (errorCode) => {
      console.log();
      
      switch (errorCode) {
      case 'auth/user-not-found':
         return 'No user found with this email.';
      case 'auth/invalid-credential':
         return 'Invalid email or password.';
      case 'auth/wrong-password':
         return 'Incorrect password.';
      case 'auth/invalid-email':
         return 'Invalid email format.';
      case 'auth/too-many-requests':
         return 'Too many attempts. Please try again later.';
      default:
         return 'An error occurred. Please try again.';
      }
   };

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
                     <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
                        {showResetForm ? 'Reset Password' : 'Sign In'}
                     </h1>

                     <form onSubmit={showResetForm ? handleResetPassword : handleLoginFormSubmit} className='w-full flex flex-col space-y-4'>
                        <input
                           type='email'
                           className='p-3 sm:p-4 bg-gray-700 rounded'
                           placeholder='email'
                           autoComplete='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />

                        {!showResetForm && (
                           <>
                              <input
                                 type='password'
                                 className='p-3 sm:p-4 bg-gray-700 rounded'
                                 placeholder='password'
                                 autoComplete='current-password'
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className='text-right text-sm text-red-500 hover:text-white cursor-pointer'>
                                 <span onClick={() => setShowResetForm(true)}>Forgot Password?</span>
                              </div>
                           </>
                        )}


                        <button disabled={loading} className='bg-red-600 hover:bg-green-500 py-3 sm:py-4 rounded font-bold cursor-pointer'>
                           {showResetForm ? 'Send Reset Email' : 'Login'}
                        </button>

                        {!showResetForm && (
                           <div className='flex justify-between items-center text-gray-600 text-sm'>
                              <label className='flex items-center cursor-pointer'>
                                 <input
                                    type="checkbox"
                                    className='mr-2'
                                    checked={rememberLogin}
                                    onChange={() => setRememeberLogin(!rememberLogin)}
                                 />
                                 Remember Me
                              </label>
                              <p>Need Help?</p>
                           </div>
                        )}


                        {showResetForm && (
                           <p className='text-md'>
                              <span className='text-gray-600 mr-2'>← Back to</span>
                              <span
                                 className='cursor-pointer hover:text-red-600'
                                 onClick={() => setShowResetForm(false)}>
                                 Login
                              </span>
                           </p>
                        )}

                        <p className='text-md'>
                           <span className='text-gray-600 mr-2'>New to Netflix?</span>
                           <Link to={'/register'} className='hover:text-red-600'>Sign Up</Link>
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
   );
    
}

export default Login
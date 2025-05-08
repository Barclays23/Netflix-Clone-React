import React, { useEffect, useRef, useState } from 'react'
import { userAuth } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { signUpPageBGUrl } from '../services/movieServices';
import FavMovieCard from '../components/FavMovieCard';



function Profile() {
   const [movies, setMovies] = useState([]);
   const {user} = userAuth();

   const sliderRef = useRef()



   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const userDoc = doc(db, 'users', user.email);
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists()) {
               const likedMovies = docSnap.data().likedMovies || []
               console.log('likedMovies from Firestore:', likedMovies);
               setMovies(likedMovies)
               
            } else {
               console.log('No such document!');
            }
         } catch (error) {
            console.error('Error fetching document:', error);
         }
      };

      fetchUserData();

   }, []);
   
   // console.log('movies :', movies);


   const slideLeft = () => {
      sliderRef.current.scrollLeft -= 500
   }

   const slideRight = () => {
      sliderRef.current.scrollLeft += 500
   }



   return (
      <>
         <div>
            <div>
               <img 
                  className='block w-full h-[550px] object-cover'
                  src={signUpPageBGUrl} 
                  alt="Profile-Banner-Image"
               />

               <div className='backdrop bg-black/60 absolute top-0 left-0 w-full h-[550px]'></div>

               <div className='absolute top-[20%] p-4 md:p-8'>
                  <h1 className='text-3xl md:text-4xl font-bold mt-20'> My Profile </h1>
                  <p className='font-light text-gray-400 text-lg'>{user.email}</p>
               </div>

            </div>
         </div>

         <h2 className='capitalize p-4 md:text-xl font-bold'> My Favourites </h2>

         <div className='movie-row relative flex items-center group'>
            <div
               ref={sliderRef}
               className='movie-card w-full h-full mx-9'>
               {movies.map((movie)=>(
                  <FavMovieCard key={movie.id} movie={movie}></FavMovieCard>
               ))}
            </div>
         </div>
      </>
   )
}

export default Profile
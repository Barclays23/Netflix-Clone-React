import React, { useEffect, useRef, useState } from 'react'
import { userAuth } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { signUpPageBGUrl } from '../services/movieServices';
import FavMovieCard from '../components/FavMovieCard';
import FavMovieCard2 from '../components/FavMovieCard2';
import Spinner2 from '../components/Spinner2';
import Spinner1 from '../components/Spinner1';



function Profile() {
   const [movies, setMovies] = useState([]);
   const {user} = userAuth();

   const sliderRef = useRef()

   const {loading: authLoading, logoutLoading } = userAuth();



   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const userDoc = doc(db, 'users', user.email);
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists()) {
               const likedMovies = docSnap.data().likedMovies || []
               // console.log('likedMovies from Firestore:', likedMovies);
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



   const slideLeft = () => {
      sliderRef.current.scrollLeft -= 500
   }

   const slideRight = () => {
      sliderRef.current.scrollLeft += 500
   }


   if (authLoading) {
      return <Spinner1 />;  // showing spinner1 when checking user auth checking
   }

   if (logoutLoading) {
      return <Spinner2 />;  // showing spinner1 when logout
   }



   return (
      <>
         <div className="relative w-full h-[250px] sm:h-[400px] md:h-[450px] lg:h-[550px]">
            <img 
               className="block w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
               src={signUpPageBGUrl} 
               alt="Profile-Banner-Image"
            />
      
            <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/95' />
      
            <div className="absolute top-[25%] sm:top-[30%] md:top-[35%] left-4 sm:left-8">
               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-10 sm:mt-16 md:mt-20 text-white">
               My Profile
               </h1>
               <p className="font-light text-gray-300 text-sm sm:text-base md:text-lg break-all">
               {user.email}
               </p>
            </div>
         </div>
   
         <h2 className="capitalize p-4 text-lg sm:text-xl md:text-2xl font-bold">
            My Favourites
         </h2>

         {/* FAVMOVIECARD WITH FIXED SIZE */}
         {/* <div className='movie-row relative flex group mx-10'>
            <div
               ref={sliderRef}
               className='movie-card w-[100%] h-[100%]'>
               {movies.map((movie)=>(
                  <FavMovieCard key={movie.id} movie={movie} />
               ))}
            </div>
         </div> */}


         {/* COPY: FAVMOVIECARD-2 WITH GRID SIZE */}
         <div className='movie-row relative mr-7 ml-3'>
            {movies.length === 0 ? (
               <div className="text-center w-full py-10 text-gray-500 text-lg">
                  No favourites added yet.
               </div>
            ) : (
               <div
                  ref={sliderRef}
                  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-full'>
                  {movies.map((movie) => (
                     <FavMovieCard2 key={movie.id} movie={movie} />
                  ))}
               </div>
            )}
         </div>


      </>
   );
    


}

export default Profile
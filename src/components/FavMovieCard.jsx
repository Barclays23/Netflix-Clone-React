import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import { FaTimes } from 'react-icons/fa';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userAuth } from '../context/AuthContext'
import MovieTrailer from './MovieTrailer';
import { toast } from 'react-toastify';
import { CiPlay1 } from 'react-icons/ci';




function FavMovieCard({movie}) {
    const {title, backdrop_path, poster_path} = movie

    const [isRemoved, setIsRemoved] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    
    const {user} = userAuth()

    
    const removeFromFavourites = async (e)=>{
        e.stopPropagation();

        const userDoc = doc(db, 'users', user.email);
        
        try {
            await updateDoc(userDoc, {
                likedMovies: arrayRemove(movie)
            });
            
            setIsRemoved(true);

        } catch (error) {
            toast.error('Something went wrong! Failed to remove from favourites. Try again later')
            console.error('Error removing favourites:', error);
        }
    }

    const setupTrailer = ()=>{
        if (user){
            setShowTrailer(true);
        } else {
            toast.warn('You are logged out! Please login to watch this movie.')
        }
    }




    if (isRemoved) return null;

    return (
        <>
            <div 
                className='movie-card relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'
                onClick={setupTrailer}>
                <img 
                    className='w-full h-40 block object-cover object-top'
                    src={createImageUrl('w500', backdrop_path ?? poster_path)} 
                    alt={movie.title}
                />

                <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
                    <div className='relative w-full h-full flex flex-col justify-center items-center'>
                        <CiPlay1 className='text-5xl text-white opacity-80 mb-1 hover:text-red-600' />
                        <p className='text-xs md:text-sm font-bold text-center whitespace-normal'>
                            {title}
                        </p>
                    </div>

                    <p onClick={(e)=> removeFromFavourites()}>
                        <FaTimes className='remove-icon absolute top-1 right-1 text-gray-300' size={20} />
                    </p>
                </div>
            </div>
            {showTrailer && <MovieTrailer movieId={movie.id} closeTrailer={() => setShowTrailer(false)} />}
        </>
    )
}

export default FavMovieCard
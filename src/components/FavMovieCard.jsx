import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import { FaTimes } from 'react-icons/fa';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userAuth } from '../context/AuthContext'
import MovieTrailer from './MovieTrailer';




function FavMovieCard({movie}) {
    const {title, backdrop_path, poster_path} = movie

    const [isRemoved, setIsRemoved] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    
    const {user} = userAuth()

    
    const removeFromFavourites = async ()=>{
        if (!user?.email) {
            alert('Please login to remove from favourites');
            return;
        }

        const userDoc = doc(db, 'users', user.email);
        
        try {
            await updateDoc(userDoc, {
                likedMovies: arrayRemove(movie)
                // likedMovies: arrayRemove(movie.id)
            });
            
            setIsRemoved(true);

        } catch (error) {
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
                    <p className='movie-title whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold'>
                        {title}
                    </p>
                    <p onClick={removeFromFavourites}>
                        <FaTimes className='remove-icon absolute top-1 right-1 text-gray-300' size={20} />
                    </p>
                </div>
            </div>
            {showTrailer && <MovieTrailer movieId={movie.id} closeTrailer={() => setShowTrailer(false)} />}
        </>
    )
}

export default FavMovieCard
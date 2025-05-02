import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userAuth } from '../context/AuthContext'

import { toast } from 'react-toastify'



function MovieCard({movie}) {
    const {title, backdrop_path, poster_path} = movie
    const [like, setLike] = useState(false)
    const {user} = userAuth()


    
    const markFavouriteMovies =async ()=>{
        const userEmail = user && user.email ? user.email : '';
        // console.log('userEmail for markFavouriteMovies :', userEmail)

        if (userEmail){
            const userDoc = doc(db, 'users', userEmail);
            
            try {
                if (like) {
                    await updateDoc(userDoc, {
                        likedMovies: arrayRemove(movie)
                        // likedMovies: arrayRemove(movie.id)
                    });
                    toast.info('Removed from favourites 💔');
                } else {
                    await updateDoc(userDoc, {
                        likedMovies: arrayUnion(movie)
                        // likedMovies: arrayUnion(movie.id)
                    });
                    toast.success('Added to favourites ❤️');
                }

                setLike(!like);  // Set the like state only after successful update

            } catch (error) {
                console.error('Error updating favourites:', error);
                toast.error('Something went wrong! Please try again.');
            }

        } else {
            toast.warning('Please login to add to favourites');
        }
    }

    return (
        <div 
            className='movie-card relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'
            onClick={playTrailer}>
            <img 
                className='w-full h-40 block object-cover object-top'
                src={createImageUrl('w500', backdrop_path ?? poster_path)} 
                alt={movie.title}
            />
            <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
                <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold'>
                    {title}
                </p>
                <p onClick={markFavouriteMovies}>
                    {like ? 
                        (<FaHeart size={20} className='absolute top-2 left-2 text-gray-300' />) 
                        : 
                        (<FaRegHeart size={20} className='absolute top-2 left-2 text-gray-300' />)
                    }
                </p>
            </div>
        </div>
    )
}

export default MovieCard
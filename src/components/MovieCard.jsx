import React, { useEffect, useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import { FaHeart, FaPlay, FaRegHeart } from 'react-icons/fa'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userAuth } from '../context/AuthContext'

import { toast } from 'react-toastify'
import MovieTrailer from './MovieTrailer'
import { CiPlay1 } from 'react-icons/ci'



function MovieCard({movie, favouriteMovies}) {
    const {title, backdrop_path, poster_path} = movie
    const [like, setLike] = useState(false)
    const [showTrailer, setShowTrailer] = useState(false)


    const {user} = userAuth()


    // checking is the movies already in favourites list.
    useEffect(() => {
        if (favouriteMovies && favouriteMovies.length > 0) {
            const isFav = favouriteMovies.some(fav => fav.id === movie.id)
            setLike(isFav)  // set as favourite by default.
        }
    }, [favouriteMovies, movie.id])


    
    const markFavouriteMovies = async (e)=>{
        e.stopPropagation();

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


    const setupTrailer = ()=>{
        if (user){
            setShowTrailer(true);
        } else {
            toast.warn('Only members can stream the movie! Please login.')
        }
    }



    return (
        <>
            <div 
                onClick={setupTrailer}
                className='movie-card relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                
                <img 
                    className='w-full h-40 block object-cover object-top'
                    src={createImageUrl('w500', backdrop_path ?? poster_path)} 
                    alt={movie.title}
                />

                <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>

                    <div className='relative w-full h-full flex flex-col justify-center items-center'>
                        <CiPlay1 className='text-5xl opacity-80 mb-1
                        text-gray-400
                        hover:text-red-400
                        hover:scale-120 duration-1000' />
                        <p className='text-xs md:text-sm font-bold text-center whitespace-normal text-gray-300'>
                            {title}
                        </p>
                    </div>

                    <p className='fav-heart-icons' onClick={(e)=> markFavouriteMovies(e)}>
                        {like ? 
                            (<FaHeart size={20} className='absolute top-2 left-2 text-red-500 hover:text-red-600 hover:scale-120 duration-500' />) 
                            : 
                            (<FaRegHeart size={20} className='absolute top-2 left-2 text-gray-300 hover:text-red-600 hover:scale-120 duration-500' />)
                        }
                    </p>
                </div>

            </div>

            {showTrailer && <MovieTrailer movieId={movie.id} closeTrailer={() => setShowTrailer(false)} />}
        </>
    )
}

export default MovieCard
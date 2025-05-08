import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createImageUrl, endPoints, signUpPageBGUrl } from '../services/movieServices'
import { userAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import MovieTrailer from './MovieTrailer'


function Hero() {
    const [heroMovie, setHeroMovie] = useState({})
    const [showTrailer, setShowTrailer] = useState(false)

    const {user} = userAuth()

    useEffect(()=>{
        axios.get(endPoints.popular).then((response)=> {
            // console.log(endPoints)
            const movies = response.data.results;
            // console.log('movies data from api :', movies)

            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovie = movies[randomIndex];
            setHeroMovie(randomMovie)
        })
    }, [])

    const {backdrop_path, title, overview, release_date} = heroMovie

    const truncateText = (text, maxLength)=> {
        if (!text) return ''

        return text.length > maxLength ? text.slice(0, maxLength) +'...' : text;
    }


    const setupTrailer = ()=>{
        if (user){
            setShowTrailer(true);
        } else {
            toast.warn('Only members can stream the movie! Please login.')
        }
    }




    if (!heroMovie) {
        return (
            <p>LOADING MOVIE...</p>
        )
    }


    return (
        <>
            <div className='relative w-full h-[500px] md:h-[550px] lg:h-[650px] mb-5'>
                <div className='absolute w-full h-full bg-gradient-to-t from-black z-10' />
                <div className='absolute w-full h-full bg-gradient-to-r from-black z-10' />
                
                <img
                    className='w-full h-full object-cover object-top'
                    src={createImageUrl('original', backdrop_path)}
                    alt="Hero_Movie_Image"
                />

                <div className='absolute w-full top-3/4 md:top-[50%] sm:top-[80%] transform -translate-y-1/2 md:-translate-y-0 p-4 sm:p-4 md:p-8 z-20'>
                    <h1 className='text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold text-white'>{title}</h1>

                    <div className='mt-3 md:mt-6 mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                        <button
                            onClick={setupTrailer}
                            className='self-start sm:self-auto w-fit px-3 py-1 sm:px-5 sm:py-2 capitalize border bg-gray-950 text-red-300 hover:text-red-400 border-red-400 hover:bg-black hover:border-red-500 hover:shadow-sm hover:shadow-red-500 transition duration-200 text-center'
                        >
                            Play
                        </button>
                        <button
                            className='self-start sm:self-auto w-fit px-3 py-1 sm:px-5 sm:py-2 capitalize border border-gray-500 hover:border-gray-300 text-gray-400 hover:text-gray-300 hover:bg-black hover:shadow-sm hover:shadow-gray-300 transition duration-200 text-center'
                        >
                            Watch Later
                        </button>
                    </div>

                    <p className='text-gray-400 text-xs sm:text-sm mb-1'>{release_date}</p>
                    <p className='text-xs sm:text-sm md:text-base w-full max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] text-gray-200'>
                        {truncateText(overview, 200)}
                    </p>
                </div>

            </div>

            {showTrailer && (
                <MovieTrailer movieId={heroMovie.id} closeTrailer={() => setShowTrailer(false)} />
            )}
        </>
    )

    return (
        <> 
            <div className='hero-1 w-full h-[550px] lg:h-[650px]'>
                <div className='h-full w-full'>
                    <div className='black-backdrop1 absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-t from-black' />
                    <div className='black-backdrop2 absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-r from-black' />
                    <img
                        className='w-full h-full object-cover object-top'
                        src={createImageUrl('original', backdrop_path)}
                        alt="Hero_Movie_Image"
                    />
                    <div className='absolute w-full top-[55%] lg:top-[65%] p-4 md:p-8'>
                        <h1 className='hero-movie-title text-3xl md:text-6xl font-bold'>{title}</h1>
                        <div className='mt-8 mb-4'>
                            <button onClick={setupTrailer}
                                className='capitalize border px-5 py-2 mr-4 cursor-pointer
                                bg-gray-950
                                text-red-300
                                hover:text-red-400
                                border-red-400
                                hover:bg-black
                                hover:border-red-500
                                hover:shadow-sm hover:shadow-red-500'>
                                Play
                            </button>
                            <button 
                                className='capitalize px-5 py-2 cursor-pointer
                                border border-gray-500 
                                hover:border-gray-300
                                text-gray-400
                                hover:text-gray-300
                                hover:bg-black
                                hover:shadow-sm hover:shadow-gray-300'>
                                Watch Later
                            </button>
                        </div>
                        <p className='text-gray-400 text-sm'>{release_date}</p>
                        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] text-gray-200'>{truncateText(overview, 200)}</p>
                    </div>
                </div>
            </div>

            {showTrailer && <MovieTrailer movieId={heroMovie.id} closeTrailer={() => setShowTrailer(false)} />}
        </>
    )
}

export default Hero
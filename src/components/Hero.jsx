import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createImageUrl, endPoints } from '../services/movieServices'
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
            <div className='w-full h-[550px] lg:h-[650px]'>
                <div className='h-full w-full'>
                    <div className='black-backdrop1 absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-t from-black' />
                    <div className='black-backdrop2 absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-r from-black' />
                    <img
                        className='w-full h-full object-cover object-top'
                        src={createImageUrl('original', backdrop_path)}
                        alt="Hero_Movie_Image"
                    />
                    <div className='absolute w-full top-[55%] lg:top-[65%] p-4 md:p-8'>
                        <h1 className='text-3xl md:text-6xl font-bold'>{title}</h1>
                        <div className='mt-8 mb-4'>
                            <button onClick={setupTrailer}
                                className='capitalize border border-gray-300 bg-gray-400 text-black px-5 py-2 mr-4
                                hover:bg-red-600 hover:border-red-500 hover:text-white cursor-pointer'>
                                Play
                            </button>
                            <button className='capitalize border border-gray-300 px-5 py-2'>Watch Later</button>
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
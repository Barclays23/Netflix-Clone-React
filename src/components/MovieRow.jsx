import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userAuth } from '../context/AuthContext'

function MovieRow({ category, url }) {
    const [rowMovies, setRowMovies] = useState([])
    const sliderRef = useRef(null)


    const [favouriteMovies, setFavouriteMovies] = useState([])
    const { user } = userAuth()


    // fetch favourite movies
    useEffect(() => {
        const fetchFavourites = async () => {
            if (user && user.email) {
                const userDoc = doc(db, 'users', user.email)
                const docSnap = await getDoc(userDoc)
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setFavouriteMovies(data.likedMovies || [])
                }
            }
        }
        fetchFavourites()
    }, [user])


    // fetch movies of category
    useEffect(() => {
        axios.get(url).then((response) => {
            setRowMovies(response.data.results)
        })
    }, [url])

    
    const slideLeft = () => {
        if (sliderRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 200 : 500
            sliderRef.current.scrollLeft -= scrollAmount
        }
    }

    const slideRight = () => {
        if (sliderRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 200 : 500
            sliderRef.current.scrollLeft += scrollAmount
        }
    }

    return (

        <div>        
            <h2 className='capitalize p-2 text-lg md:text-xl font-bold'>{category}</h2>
            <div className='movie-row relative flex items-center group'>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white rounded-full absolute left-1 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10'
                    size={40}
                />
                <div
                    ref={sliderRef}
                    className='movie-card w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide touch-pan-x'
                >
                    {rowMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            favouriteMovies={favouriteMovies}
                        />
                    ))}
                </div>
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white rounded-full absolute right-1 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10'
                    size={40}
                />
            </div>
        </div>
    )
}

export default MovieRow

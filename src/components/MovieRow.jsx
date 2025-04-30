import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'



function MovieRow({category, url}) {
    const [rowMovies, setRowMovies] = useState([])
    const sliderRef = useRef(0)

    useEffect(()=>{
        axios.get(url).then((response)=>{
            // console.log('category :', category, 'results :', response.data.results)
            setRowMovies(response.data.results)
        })
    }, [url])

    // console.log('rowMovies :', rowMovies)


    const slideLeft = () => {
        sliderRef.current.scrollLeft -= 500
    }
    
    const slideRight = () => {
        sliderRef.current.scrollLeft += 500
    }


    return (
        <>
            <h2 className='capitalize p-4 md:text-xl font-bold'>{category}</h2>
            <div className='movie-row relative flex items-center group'>
                <MdChevronLeft 
                    onClick={slideLeft}
                    className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 hidden z-10 group-hover:block cursor-pointer'
                    size={50}
                />

                <div
                    // id='slider'
                    ref={sliderRef}
                    className='movie-card w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {rowMovies.map((movie)=>(
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))}
                </div>

                <MdChevronRight 
                    onClick={slideRight}
                    className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 hidden z-10 group-hover:block cursor-pointer'
                    size={50}
                />
            </div>
        </>
    )
}

export default MovieRow
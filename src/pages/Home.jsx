import React from 'react'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import MovieRow from '../components/MovieRow'
import { endPoints } from '../services/movieServices'





function Home() {
   return (
      <>
         {/* <div className='relative'>
            <Hero2 className='absolute' ></Hero2>
            <Hero className='absolute' ></Hero>
         </div> */}
         <Hero></Hero>
         <MovieRow category='popular' url={endPoints.popular}></MovieRow>
         <MovieRow category='trending' url={endPoints.trending}></MovieRow>
         <MovieRow category='top rated' url={endPoints.topRated}></MovieRow>
         <MovieRow category='comedy' url={endPoints.comedy}></MovieRow>
      </>
   )
}

export default Home
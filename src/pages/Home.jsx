import React from 'react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import { endPoints } from '../services/movieServices'

function Home() {

   return (
      <>
         <Hero></Hero>
         <MovieRow category='popular' url={endPoints.popular}></MovieRow>
         <MovieRow category='trending' url={endPoints.trending}></MovieRow>
         <MovieRow category='top rated' url={endPoints.topRated}></MovieRow>
         <MovieRow category='comedy' url={endPoints.comedy}></MovieRow>
      </>
   )
}

export default Home
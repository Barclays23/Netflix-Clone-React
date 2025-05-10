import React from 'react'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import MovieRow from '../components/MovieRow'
import { endPoints } from '../services/movieServices'
import Spinner1 from '../components/Spinner1'
import Spinner2 from '../components/Spinner2'
import { userAuth } from '../context/AuthContext'





function Home() {

   const { user, loading: authLoading, logoutLoading} = userAuth()



   if (authLoading) {
      return <Spinner1 />;  // showing spinner1 when checking user auth checking
   }

   if (logoutLoading) {
      return <Spinner2 />;  // showing spinner1 when logout
   }


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
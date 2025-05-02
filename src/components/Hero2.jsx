import React from 'react'
import { signUpPageBGUrl } from '../services/movieServices';



function Hero2 () {
    return (
        <>
            <div className='hero-2'>
                <img 
                    className='block w-full h-[550px] object-cover'
                    src={signUpPageBGUrl} 
                    alt="Profile-Banner-Image"
                />

                <div className='black-backdrop2 absolute bg-gradient-to-t from-black/90 top-0 left-0 w-full h-[550px]'></div>
            </div>
        </>
    )
}

export default Hero2
// MovieTrailer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, tmdbKey } from '../services/movieServices';
import { toast } from 'react-toastify';





function MovieTrailer({ movieId, closeTrailer }) {
    const [trailerKey, setTrailerKey] = useState('');


    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                // console.log('movieId :', movieId);
                // console.log('tmdbKey :', tmdbKey);
                const response1 = await axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${tmdbKey}&language=en-US`);
                
                const trailers = response1.data.results;
                // console.log('trailers :', trailers);

                const youtubeTrailer = trailers.find(
                    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
                );

                // console.log('youtubeTrailer :', youtubeTrailer);
                
                if (youtubeTrailer) {
                    setTrailerKey(youtubeTrailer.key);
                } else {
                    toast.warn('No Trailer Available For This Movie')
                    console.log('Trailer not found');
                }
            } catch (err) {
                toast.error('Something went wrong. Failed to fetch trailer')
                console.error('Failed to fetch trailer:', err);
            }
        };

        fetchTrailer();
    }, [movieId]);



    return (
        <>
            {trailerKey && (
                <div className="fixed inset-0 p-10  bg-gray-950/90 flex justify-center items-center z-30">
                    <div className="relative w-[70%] h-[90%] pointer-events-auto">
                        <button onClick={closeTrailer} className="absolute top-2 right-2 text-white text-xl p-2 cursor-pointer z-100 "> ✖ </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieTrailer;

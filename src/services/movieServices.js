const tmdbKey = import.meta.env.VITE_TMDB_KEY;

// APIUrl
export const baseUrl = "https://api.themoviedb.org/3";

export const endPoints = {
    popular: `${baseUrl}/movie/popular?api_key=${tmdbKey}`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${tmdbKey}`,
    upcoming: `${baseUrl}/movie/upcoming?api_key=${tmdbKey}`,
    trending: `${baseUrl}/trending/movie/day?api_key=${tmdbKey}`,
    comedy: `${baseUrl}/discover/movie?api_key=${tmdbKey}&with_genres=35`,
};


// export const imageUrl = "https://image.tmdb.org/t/p/original/";  original is one of the sizes
export const imageUrl = "https://image.tmdb.org/t/p/";

export const createImageUrl = (size, filename)=>{
    return `${imageUrl}${size}/${filename}`;
}

export const signUpPageBGUrl = 'https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_large.jpg'
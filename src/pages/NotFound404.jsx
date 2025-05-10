import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100 px-4">
         <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-pulse">
            404
         </h1>
         <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Page Not Found
         </h2>
         <p className="text-lg md:text-xl mb-6 text-gray-400 max-w-md text-center">
            Oops! The page you are looking for does not exist or has been moved.
         </p>
         <Link
            to="/"
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform transform hover:scale-105"
         >
            ← Go back to Home
         </Link>
      </div>
   );
}


export default NotFound404

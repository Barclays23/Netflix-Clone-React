import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { 
   onAuthStateChanged,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   browserLocalPersistence,
   browserSessionPersistence,
   setPersistence
} from "firebase/auth";



const AuthContext = createContext();


// Provider component
export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Signup function
   const signUp = async (email, password) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', email), { likedMovies: [] });
      return userCredential;
   }


   // Login function
   const logIn = async (email, password, rememberMe = false) => {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      return signInWithEmailAndPassword(auth, email, password);
   };
   

   // Logout function
   const logOut = () => {
      return signOut(auth)
   }


   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
         // console.log('Auth State Changed : ', currentUser);
      });

      return () => unsubscribe();
   }, []);



   return (
      <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook to use auth context
export const userAuth = () => useContext(AuthContext);

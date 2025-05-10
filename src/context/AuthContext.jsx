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
   setPersistence,
   sendPasswordResetEmail
} from "firebase/auth";



const AuthContext = createContext();


// Provider component
export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [logoutLoading, setLogoutLoading] = useState(false);


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
   const logOut = async () => {
      setLogoutLoading(true);
      try {
         await signOut(auth);
      } catch (error) {
         console.log(error);
      } finally {
         setTimeout(() => {
            setLogoutLoading(false);
         }, 1000);      
      }
   };

   const resetPassword = (email) => sendPasswordResetEmail(auth, email)


   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
         // console.log('Auth State Changed : ', currentUser);
      });

      return () => unsubscribe();
   }, []);


   return (
      <AuthContext.Provider value={{ user, loading, logoutLoading, signUp, logIn, logOut, resetPassword }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook to use auth context
export const userAuth = () => useContext(AuthContext);

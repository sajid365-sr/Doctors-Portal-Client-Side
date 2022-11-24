
import React, { createContext, useEffect, useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (userInfo) =>{
        return updateUser(user, userInfo);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect( () =>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            console.log('User observing')
            setUser(currentUser)
        })
        return () =>{
            unsubscribe();
        }
    },[]);

const authInfo = {createUser, signIn, user, logOut, updateUser};

    return (
        
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        
    );
};

export default AuthProvider;
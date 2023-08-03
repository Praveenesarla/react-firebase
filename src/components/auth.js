import React, { useState } from 'react';
import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");

    const signIn = async() =>{
      try {
        await createUserWithEmailAndPassword(auth,email,passsword);
      } catch (err){
        console.error(err)
      }
    };

    const logout = async() =>{
      try{
        await signOut(auth);
      } catch (err) {
        console.error(err)
      }
    }
    
    const signWithGoogle = async () =>{
      try{
        await signInWithPopup(auth,googleProvider)
      } catch (err){
        console.error(err);
      }
    }

  return (
    <div>
        <input placeholder='email...' type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signWithGoogle}>Sign with Google</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

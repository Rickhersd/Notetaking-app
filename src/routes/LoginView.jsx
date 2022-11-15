import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import {auth, userExists} from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

export default function LoginView(){

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  /*
  0: initiliazed
  1: loading
  2: completed login
  3: login without register
  4: no one logined
  */
  const [state, setState] = useState(0);

  async function handleOnClick(){
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider){
      try{
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch(e){
        console.error(e);
      }
    }
  }

  function handleUserLoggedIn(user){
    navigate("/dashboard");
  };
    
  function handleUserNotRegistered(user){
    navigate("/choose-username")
  };
  function handleUserNotLoggedIn(){
    setState(4);
  };

  if (state === 4){
    return( 
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    )
  }

  return (
    <AuthProvider 
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>loading</div>

    </AuthProvider>
  )
}
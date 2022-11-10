import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import {auth, userExists} from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    setState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  },[])

  async function handleUserStateChanged(user){
    if(user){
      const isRegistered = await userExists(user.uid);
      if(isRegistered){
        navigate("/dashboard");
        setState(2);
      } else {
        navigate("/choose-username")
        setState(3);
      }
      console.log(user.displayName);
    } else {
      setState(4);
      console.log("no hay nadie autenticado")
    }
  }

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

  if (state === 2){
    return <div>autenticado y resgistrado</div>
  }
  if (state === 3){
    return <div>Autenticado sin registro</div>
  }
  if (state === 4){
    return( 
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    )
  }

  return <div>loading</div>
}
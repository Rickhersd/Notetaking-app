import {onAuthStateChanged} from "firebase/auth";
import {useEffect} from "react";
import {auth, userExists} from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}){

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if(user){
            const isRegistered = await userExists(user.uid);
            if(isRegistered){
              onUserLoggedIn(user);
            } else {
              onUserNotRegistered(user);
            }
            console.log(user.displayName);
          } else {
            onUserNotLoggedIn();
          }
        });
      },[navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
    
    return <div>{children}</div>
}
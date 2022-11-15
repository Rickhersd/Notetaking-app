import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from 'react';

export default function ChooseUsernameView(){

  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [user, setUser] = useState({})

  function handleUserLoggedIn(user){
    navigate("/dashboard");
    };
      
  function handleUserNotRegistered(user){
    setUser(user);
    setState(3);
  };

  function handleUserNotLoggedIn(){
    navigate("/login");
  };

  if (state === 3){
    return (
      <div>
        <h1>Bienvenido {user.displayName}</h1>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
}
import React, { useState, useEffect, useContext, createContext } from "react";
import agent from "../agent";
import Cookies from "js-cookie";
import { useUser } from './user';

const authContext = createContext();


export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const { setUser } = useUser();

  const signIn = (email, password) => {
    return agent.Auth.login(email, password).then(response => {
      Cookies.set('jwt', response.jwt)
      setUser({ isLoggedIn: true })
    });
  };

  const signup = (email, password) => {
    return agent.Auth.register.then(response => {
      return response.user;
    });
  };

  // Return the user object and auth methods
  return {
    signIn,
    signup,
  };
}

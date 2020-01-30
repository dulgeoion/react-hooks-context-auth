import React, { useState, useEffect, useContext, createContext } from "react";
import agent from "../../agent";
import Cookies from "js-cookie";
import { useUser } from '../User/actions';

const authContext = createContext();


export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


export const useAuth = () => {
  return useContext(authContext);
};

const useProviderAuth = () => {
  const { setUser, getUser, removeUser } = useUser();

  const signIn = (email, password) => {
    return agent.Auth.login(email, password).then(response => {
      Cookies.set('jwt', response.jwt)
      return getUser()
    }).then(res =>  setUser({ isLoggedIn: true, ...res }))
  };

  const signup = (email, password) => {
    return agent.Auth.register.then(response => {
      return response.user;
    });
  };

  const signOut = () => {
    Cookies.remove('jwt');
    removeUser();
  }

  return {
    signIn,
    signup,
    signOut
  };
}

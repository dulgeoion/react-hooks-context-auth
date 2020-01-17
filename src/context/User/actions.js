import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer
} from "react";
import agent from '../../agent';
import Cookies from "js-cookie";
import userReducer from "./reducer";
import { SET_USER, SET_USER_LOCALE, REMOVE_USER } from "./types";

const userContext = createContext();

export const INITIAL_USER = {
  user: {
    isLoggedIn: false,
    locale: 'uk'
  }
};

export function UserProvider({ children }) {
  const user = useProvideUser();
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useUser = () => {
  return useContext(userContext);
};

function useProvideUser() {
  const [state, dispatch] = useReducer(userReducer, INITIAL_USER);

  useEffect(() => {
    getUser();
  }, [state.isLoggedIn]);

  const getUser = async () => {
    return agent.User.get()
      .then(async res =>
        dispatch({
          type: SET_USER,
          payload: { ...res, isLoggedIn: true }
        })
      )
      .catch(e => null);
  };

  const setUserLocale = (locale) => {
    dispatch({
      type: SET_USER_LOCALE,
      payload: locale
    })
  }

  const setUser = (obj) => {
    dispatch({
      type: SET_USER,
      payload: obj
    })
  }

  const removeUser = () => {
    dispatch({
      type: REMOVE_USER
    })
  }

  return {
    user: state.user,
    getUser,
    setUserLocale,
    removeUser,
    setUser
  };
}

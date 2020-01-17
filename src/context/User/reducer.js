import { SET_USER, REMOVE_USER, SET_USER_LOCALE } from "./types";

export default (state, action) => {
  console.log("TCL: state, action", state, action);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case SET_USER_LOCALE:
      return {
        ...state,
        user: {
          ...state.user,
          locale: action.payload
        }
      };

    case REMOVE_USER:
      return {
        ...state,
        user: {
          locale: state.user.locale,
          isLoggedIn: false
        }
      };
    default:
      return state;
  }
};

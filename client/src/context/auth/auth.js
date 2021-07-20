import { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

export const AuthContext = createContext(initialState);
export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (data) => {
    localStorage.setItem("jwtToken", data.token);
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

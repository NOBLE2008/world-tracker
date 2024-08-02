import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        authenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        authenticated: false,
        user: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  email: "nobleben2008@gmail.com",
  password: "p@$$w0rd",
  avatar: "https://i.pravatar.cc/100?u=b4a75b",
  name: "Noble Benjamin"
};

const initialState = {
  authenticated: false,
  user: null,
};

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({children}) {
  const [{ authenticated, user }, dispatch] = useReducer(reducer, initialState);
  function login(USER){
    // Simulate login logic
    if (FAKE_USER.password === USER.password && FAKE_USER.email === USER.email) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout(USER){
    // Simulate logout logic
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export {useAuth, AuthProvider}

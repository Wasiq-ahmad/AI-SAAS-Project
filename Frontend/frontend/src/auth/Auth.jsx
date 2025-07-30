import { createContext, useContext, useState } from "react";

const Authcontext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");

  const login = (userData, token, username) => {
    setUser({ ...userData, token, username });
    setUsername(username); // 👈 save username

    localStorage.setItem("auth-user", JSON.stringify(userData));
    localStorage.setItem("auth-token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-token");
  };

  const value = { user, login, logout, username, isAuthenticated: !!user };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}

export function useAuth() {
  return useContext(Authcontext);
}
export default AuthProvider;

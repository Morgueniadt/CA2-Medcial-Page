import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  const onLogin = (email, password) => {
    // Hardcoded admin
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("token", "admin-token");
      setToken("admin-token");
      setIsAdmin(true);
      return { success: true };
    }

    // Normal login flow (replace with your API)
    // const res = await axios.post("/login", { email, password });

    return { success: false, message: "Invalid credentials" };
  };

  const onLogout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

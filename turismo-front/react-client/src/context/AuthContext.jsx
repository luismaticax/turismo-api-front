import { useContext, useState, createContext, useEffect } from "react";
import { logInRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

// Contexto de autenticación y administración
export const AuthAdminContext = createContext();

export const useAuthAdmin = () => {
  const context = useContext(AuthAdminContext);
  if (!context) {
    throw new Error("useAuthAdmin must be used within AuthAdminProvider");
  }
  return context;
};

// Componente `AuthAdminProvider`

export const AuthAdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDataGlobal, setUserDataGlobal] = useState(null);

  const signIn = async (userData) => {
    try {
      const response = await logInRequest(userData);

      setUser(response.data);
      setIsAuthenticated(true);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error during authentication"
      );
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await registerRequest(userData);

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    Cookies.remove("token");
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setIsAdmin(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        setIsAdmin(false);
      }
    }
    checkLogin();
  }, []);

  // Devuelve el contexto
  return (
    <AuthAdminContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        signIn,
        signUp,
        logOut,
        loading,
        userDataGlobal,
        setUserDataGlobal,
      }}
    >
      {children}
    </AuthAdminContext.Provider>
  );
};

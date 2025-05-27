import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import { loginUser, registerUser } from "../api/auth";
interface AuthContextProps {
  children: React.ReactNode;
}

interface JwtPayload {
  user: User;
  iat: number; // Issued At
  exp: number; // Expiration Time
  // Add any other standard JWT claims if you need them
}

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string; error?: string }>;

  signin: (data: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const decodeAndSetUser = useCallback((jwtToken: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(jwtToken);
      setUser(decoded.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      // If token is invalid or malformed, treat as logged out
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("jwt_token");
    }
  }, []);

  // Effect to check for token in localStorage on initial load
  useEffect(() => {
    setLoading(true);

    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      setToken(storedToken);
      decodeAndSetUser(storedToken);
    }
    setLoading(false);
  }, [decodeAndSetUser]);

  const signin = async (data: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { email, password } = data;
      const response = await loginUser(email, password);
      const { token: receivedToken } = response;

      localStorage.setItem("jwt_token", receivedToken);
      setToken(receivedToken);
      decodeAndSetUser(receivedToken);
      // Set Axios default header for all subsequent requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${receivedToken}`;
      return { success: true };
    } catch (error) {
      let errorMessage = "Login failed";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        errorMessage = err.response?.data?.error || errorMessage;
      }
      console.error(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("jwt_token");
    // Remove Axios default header
    delete axios.defaults.headers.common["Authorization"];
  };
  const signup = async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { name, email, password } = data;
      const response = await registerUser(name, email, password);

      // Backend's registerUser returns { message, userId } on success
      return { success: true, message: response.message };
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      // Use 'error' property from backend for error messages
      return {
        success: false,
        error:
          error.response?.data?.error ||
          "An unexpected error occurred during registration.",
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        token,
        signin,
        signup,

        logout,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };

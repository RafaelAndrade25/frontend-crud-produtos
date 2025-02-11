import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType{
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }, []);
  
    const login = async (email: string, password: string) => {
      const response = await axios.post("http://localhost:8080/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
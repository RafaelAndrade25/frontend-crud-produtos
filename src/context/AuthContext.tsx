import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Interface para definir o tipo do contexto de autenticação
interface AuthContextType {
  user: any; // Idealmente, substitua "any" pelo tipo do usuário esperado
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Criação do contexto com um valor inicial nulo
const AuthContext = createContext<AuthContextType | null>(null);

// Provedor de autenticação que encapsula os filhos
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null); // Estado para armazenar o usuário
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado para verificar autenticação

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", { email, password });
      const { token, user } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user); // Define o usuário no estado
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw new Error("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    delete axios.defaults.headers.common["Authorization"]; // Remove o cabeçalho de autorização
    setUser(null); // Remove o usuário do estado
    setIsAuthenticated(false); // Define como não autenticado
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
}

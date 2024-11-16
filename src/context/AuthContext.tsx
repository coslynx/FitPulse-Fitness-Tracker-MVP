import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { LoginRequest } from '../services/auth';

interface User {
  _id: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, login, logout, loading, error, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setAuthLoading(false);
  }, []);


  useEffect(() => {
    if (isAuthenticated && token) {
      localStorage.setItem('token', token)
    }
  }, [isAuthenticated, token])


  const contextValue: AuthContextProps = {
    user,
    loading: authLoading || loading,
    error: authError || error,
    login: async (credentials) => {
      setAuthLoading(true);
      setAuthError(null);
      try {
          await login(credentials);
      } catch (e: any) {
          setAuthError(e.message || 'Login Failed');
      } finally {
          setAuthLoading(false);
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      setToken(null);
    },
    setToken,
    setUser,
    setLoading: setAuthLoading,
    setError: setAuthError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```
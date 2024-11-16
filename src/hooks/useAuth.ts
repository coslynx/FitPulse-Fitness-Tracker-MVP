import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, logout, LoginRequest } from '../services/auth';

interface User {
  _id: string;
  email: string;
}

const useAuth = (): {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} => {
  const { user: contextUser, setUser, setToken, setLoading, setError } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(credentials);
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!contextUser;

  return { user: contextUser, login, logout, isAuthenticated, loading, error };
};

export default useAuth;
```
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: { username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials - In production, this would be handled by a backend API
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem('isAdminAuthenticated');
    return stored === 'true';
  });

  const [user, setUser] = useState<{ username: string } | null>(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem('isAdminAuthenticated', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('adminUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('adminUser');
    }
  }, [isAuthenticated, user]);

  const login = (username: string, password: string): boolean => {
    // In production, this would be an API call to verify credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

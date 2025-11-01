import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Keychain from 'react-native-keychain';
import api from '../services/api';
import { AxiosError } from 'axios';

// SuperSeniorAdminDev: v1.0.0 - Authentication Context
// Manages global authentication state (admin token) and provides login/logout functions.
// Uses react-native-keychain for secure, persistent storage of the JWT.

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token from keychain on app startup
    const loadToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setToken(credentials.password);
        }
      } catch (error) {
        console.error('Failed to load token from keychain', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await api.post('/auth/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const new_token = response.data.access_token;
      setToken(new_token);
      await Keychain.setGenericPassword('admin', new_token);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Login failed:', error.response?.data);
      } else {
        console.error('An unexpected login error occurred:', error);
      }
      throw error; // Re-throw to be caught by the component
    }
  };

  const logout = async () => {
    setToken(null);
    await Keychain.resetGenericPassword();
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

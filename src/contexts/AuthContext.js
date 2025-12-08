'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// API base URL - adjust this to match your backend server
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token and load user on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('finesse_token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('finesse_token');
          localStorage.removeItem('finesse_user');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('finesse_token');
        localStorage.removeItem('finesse_user');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success && data.user && data.token) {
        // Store token and user
        localStorage.setItem('finesse_token', data.token);
        localStorage.setItem('finesse_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success && data.user && data.token) {
        // Store token and user
        localStorage.setItem('finesse_token', data.token);
        localStorage.setItem('finesse_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (optional, mainly for server-side cleanup if needed)
      const token = localStorage.getItem('finesse_token');
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove token and user from localStorage
      localStorage.removeItem('finesse_token');
      localStorage.removeItem('finesse_user');
      setUser(null);
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  // Get token for API requests
  const getToken = () => {
    return localStorage.getItem('finesse_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


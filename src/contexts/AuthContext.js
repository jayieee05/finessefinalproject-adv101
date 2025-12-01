'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('finesse_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Check if session is still valid (optional: check expiration)
        setUser(userData);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('finesse_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('finesse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('finesse_user');
    }
  }, [user]);

  const login = async (email, password, rememberMe = false) => {
    try {
      // Get users from localStorage
      const usersData = localStorage.getItem('finesse_users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Find user by email
      const foundUser = users.find(u => u.email === email);

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // In a real app, you would hash the password and compare
      // For demo purposes, we'll do a simple comparison
      if (foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Create user session (without password)
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: foundUser.createdAt
      };

      setUser(userSession);
      return { success: true, user: userSession };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Get existing users
      const usersData = localStorage.getItem('finesse_users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if email already exists
      const emailExists = users.some(u => u.email === email);
      if (emailExists) {
        throw new Error('Email already registered');
      }

      // Validate password strength
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
        createdAt: new Date().toISOString()
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem('finesse_users', JSON.stringify(users));

      // Create user session (without password)
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      };

      setUser(userSession);
      return { success: true, user: userSession };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finesse_user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated
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


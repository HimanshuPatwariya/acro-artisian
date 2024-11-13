// patraassignment/Lib/AuthContext.tsx
"use client";

import { createContext, useContext, ReactNode } from 'react';
import { Auth, getAuth } from 'firebase/auth'; // Import Auth from Firebase
import { app } from './firebase'; // Import your Firebase app

const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app); // Initialize and provide auth instance

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};

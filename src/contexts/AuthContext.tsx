import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (userData: any) => void;
  logout: () => void;
  enterAsGuest: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Recupera o estado de login do AsyncStorage quando o app inicia
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedGuest = await AsyncStorage.getItem("isGuest");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }

        if (storedGuest === "true") {
          setIsGuest(true);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  const login = async (userData: any) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isGuest", "false");
      setUser(userData);
      setIsAuthenticated(true);
      setIsGuest(false);
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isGuest");
      setUser(null);
      setIsAuthenticated(false);
      setIsGuest(false);
    } catch (error) {
      console.error("Failed to remove user data", error);
    }
  };

  const enterAsGuest = async () => {
    try {
      await AsyncStorage.setItem("isGuest", "true");
      setUser(null);
      setIsGuest(true);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to save guest state", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isGuest, login, logout, enterAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

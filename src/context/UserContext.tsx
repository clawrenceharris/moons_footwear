import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { fetchUser } from "../api/user";
import { useAuth } from "./AuthContext";

export type UserContextType = {
  currentUser: User | null;
  error: string | null;

  loading: boolean;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUserId } = useAuth();
  useEffect(() => {
    if (!currentUserId) {
      return;
    }
    setLoading(true);
    fetchUser(currentUserId)
      .then((res) => {
        setCurrentUser(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentUserId]);

  return (
    <UserContext.Provider
      value={{
        loading,
        currentUser,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { UserProvider, useUser };

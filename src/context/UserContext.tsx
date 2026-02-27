/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
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
  const { user: authUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      if (!authUser?.id) {
        return;
      }
      try {
        setLoading(true);
        const user = await fetchUser(authUser.id);
        setCurrentUser(user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [authUser?.id]);

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

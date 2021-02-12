import React from "react";
import { AuthContext, useAuthState } from "../../auth";

export default function AppProviders({ children }) {
  const { loading, auth } = useAuthState();
  return (
    <AuthContext.Provider
      value={{ loggedIn: auth.loggedIn, userId: auth.userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

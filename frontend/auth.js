import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase-setup";

export const AuthContext = React.createContext({ loggedIn: false });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState({ loading: true, auth: {} });

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      setAuthState({
        loading: false,
        auth: { loggedIn: Boolean(firebaseUser), userId: firebaseUser?.uid },
      });
    });
  }, []);

  return authState;
};

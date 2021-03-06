import React from "react";
//for AuthContext.Provider
import { AuthContext, useAuthState } from "../../auth";

//for ReduxProvider
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function AppProviders({ children }) {
  const { loading, auth } = useAuthState();
  return (
    <AuthContext.Provider
      value={{ loggedIn: auth.loggedIn, userId: auth.userId }}
    >
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AuthContext.Provider>
  );
}

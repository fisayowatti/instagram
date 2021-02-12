// import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAuthState } from "./auth";
import AppProviders from "./components/app/AppProviders";

// const Stack = createStackNavigator();

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading</Text>
    </View>
  );
};

const PreApp = () => {
  const { loading, auth } = useAuthState();

  const AuthenticatedApp = React.lazy(() =>
    import("./components/app/AuthenticatedApp")
  );
  const UnauthenticatedApp = React.lazy(() =>
    import("./components/app/UnauthenticatedApp")
  );

  if (loading) {
    return <Loading />;
  }

  return auth.loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default function App() {
  return (
    <AppProviders>
      <Suspense fallback={<Loading />}>
        <PreApp />
      </Suspense>
    </AppProviders>
  );
}

const styles = StyleSheet.create({});

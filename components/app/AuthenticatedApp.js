import React, { useEffect } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useAuthState } from "../../auth";
import { fetchUser } from "../../redux/actions/index";
import Main from "../main/Main";

function AuthenticatedApp({ fetchUser, currentUser }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
// });

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchUser }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(AuthenticatedApp);

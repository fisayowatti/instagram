import React, { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import {
  FlatList,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux/actions";

function Search({ fetchUsers, navigation, allUsers }) {
  // useEffect(() => {
  //   fetchUsers("");
  // }, []);

  const debouncedSearch = useCallback(
    debounce((value) => fetchUsers(value), 1000)
  );

  const onSearch = (search) => {
    debouncedSearch(search);
    // fetchUsers(search);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search users..."
        onChangeText={(search) => onSearch(search)}
        autoCapitalize="none"
      />
      <View>
        <FlatList
          data={allUsers}
          //   keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { uid: item.id })}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

const mapStateToProps = (store) => ({
  allUsers: store.userState.allUsers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

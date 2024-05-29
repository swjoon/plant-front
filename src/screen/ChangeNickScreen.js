import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ChangeNickName } from "../api/UserApi";

const ChangeNickScreen = ({route, navigation}) => {
  const [nickName, setNickName] = useState("");
   
  const handleInputChange = (value) => {
      setNickName(value);
    };
    const { nick } = route.params;

  const handleChangeNickName = async () => {
    await ChangeNickName(nickName, navigation);
  };
  return (
    <View style={styles.container}>
      <View style={styles.nickContainer}>
        <Text style={styles.label}>현재 닉네임:</Text>
        <Text style={styles.value}>{nick}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>변경할 닉네임</Text>
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          onChangeText={handleInputChange}
          value={nickName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangeNickName}>
        <Text style={styles.buttonText}>닉네임 변경</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  nickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    flex: 2,
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ChangeNickScreen;

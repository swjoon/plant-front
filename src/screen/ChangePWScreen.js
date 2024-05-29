import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ChangePassword } from "../api/UserApi";

const ChangePWScreen = (navigation) => {
  const [userPassword, setUserPassword] = useState({
    userPw: "",
    userNewPw: "",
    userNewPwConfirm: "",
  });

  const handleInputChange = (key, value) => {
    setUserPassword({ ...userPassword, [key]: value });
  };

  const handleChangePW = async () => {
    const { userPw, userNewPw, userNewPwConfirm } = userPassword;
    if (!userPw || !userNewPw || !userNewPwConfirm) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }
    if (userNewPw !== userNewPwConfirm) {
      Alert.alert(
        "입력 오류",
        "새로운 비밀번호가 일치하지 않습니다."
      );
      return;
    }
    const data = {
        userPw: userPw,
        userNewPw: userNewPw
    }
    await ChangePassword(data, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>현재 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="현재 비밀번호"
          onChangeText={(text) => handleInputChange("userPw", text)}
          secureTextEntry={true}
          value={userPassword.userPw}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>새 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 "
          onChangeText={(text) => handleInputChange("userNewPw", text)}
          secureTextEntry={true}
          value={userPassword.userNewPw}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>새 비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 확인"
          onChangeText={(text) => handleInputChange("userNewPwConfirm", text)}
          secureTextEntry={true}
          value={userPassword.userNewPwConfirm}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePW}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
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
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
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
export default ChangePWScreen;

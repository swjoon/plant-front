import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FindPassword } from "../api/UserApi";

const FindPwScreen = (navigation) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    birth: "",
  });
  const handleInputChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };
  const handleCheckEmailFormat = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = emailFormat.test(userInfo.userId);
    setIsEmailValid(isValid);
  };
  const handleFindPW = async () => {
    await FindPassword(userInfo, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID (Email)</Text>
        <TextInput
          style={styles.input}
          placeholder="ID를 입력하세요"
          onChangeText={(text) => handleInputChange("userId", text)}
          onBlur={handleCheckEmailFormat} // 포커스가 빠져나가면 이메일 형식 검사
        />
      </View>
      {!isEmailValid && (
        <Text style={styles.errorText}>유효하지 않은 이메일 형식입니다.</Text>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          onChangeText={(text) => handleInputChange("userName", text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>생년월일(8자리)</Text>
        <TextInput
          style={styles.input}
          placeholder="ex) (2000-01-01) -> 20000101 "
          onChangeText={(text) => handleInputChange("birth", text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFindPW}>
        <Text style={styles.buttonText}>비밀번호 찾기</Text>
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
export default FindPwScreen;

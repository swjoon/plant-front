import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SignUp } from "../api/UserApi";

const SignupScreen = ({ navigation }) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fail, setFail] = useState(true);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    username: "",
    nickname: "",
    birth: null,
  }); 

  const handleInputChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleCheckEmailFormat = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = emailFormat.test(userInfo.userId);
    setIsEmailValid(isValid);
  };

  const handleSignup = async () => {
    if (!isEmailValid) {
      Alert.alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    let parsebirth = null;
    if (userInfo.birth != null) {
      parsebirth = userInfo.birth.toISOString().split("T")[0];
    }

    const userData = {
      userId: userInfo.userId,
      userPw: userInfo.userPw,
      username: userInfo.username,
      nickname: userInfo.nickname,
      birth: parsebirth,
    };

    const response = await SignUp(userData);

    if (response.status === 200) {
      navigation.reset({
        index: 0,
        routes: [{ name: "로그인" }],
      });
    } else {
      setFail(false);
    }
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
      {!fail && <Text style={styles.errorText}>이미 가입된 아이디입니다.</Text>}
      {!isEmailValid && (
        <Text style={styles.errorText}>유효하지 않은 이메일 형식입니다.</Text>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("userPw", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          onChangeText={(text) => handleInputChange("username", text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>별명</Text>
        <TextInput
          style={styles.input}
          placeholder="별명을 입력하세요"
          onChangeText={(text) => handleInputChange("nickname", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>생년월일</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {userInfo.birth
              ? userInfo.birth.toLocaleDateString("ko-KR")
              : "생년월일"}
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setShowDatePicker(false);
          handleInputChange("birth", date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>등록</Text>
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
  dateButton: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default SignupScreen;

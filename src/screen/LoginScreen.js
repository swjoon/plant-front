import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Login } from "../api/UserApi";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    try {
      const loginData = {
        userId: email,
        userPw: password,
      };
      await Login(loginData, { navigation });
    } catch (error) {}
  };

  const handleSignupPress = () => {
    navigation.navigate("회원가입");
  };

  const handleFindPwPress = () => {
    navigation.navigate("비밀번호찾기");
  };

  return (
    <ImageBackground
      source={require("/front-end/app/assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>스마트 텃밭</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="아이디 (email)"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Link} onPress={handleSignupPress}>
          <Text style={styles.LinkText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Link} onPress={handleFindPwPress}>
          <Text style={styles.LinkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 80,
    left: 20,
    marginBottom: 20,
    color: "#005500",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#007bff",
    width: "80%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  signupButton: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  Link: {
    marginTop: 20,
  },
  LinkText: {
    color: "#000", // 검은색 링크 텍스트
  },
});

export default LoginScreen;

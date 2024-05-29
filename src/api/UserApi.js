import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Address from "./config";
import { Alert } from "react-native";

const apiAddress = Address;
// 회원가입
export const SignUp = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(
      apiAddress + "/api/v1/user/register",
      userData
    );
    console.log("회원가입 서버 연결 성공: ", response.data);
    return response;
  } catch (error) {
    console.log("회원가입 서버 연결 실패: ", error);
    const response = error.response;
    return response;
  }
};

// 로그인
export const Login = async (loginData, { navigation }) => {
  try {
    const response = await axios.post(
      apiAddress + "/api/v1/user/login",
      loginData
    );
    const data = response.data;

    let userId = loginData.userId;

    await AsyncStorage.setItem("userId", userId);
    await AsyncStorage.setItem("nickName", data.nickName);
    await AsyncStorage.setItem("role", data.role);
    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);

    navigation.reset({
      index: 0,
      routes: [{ name: "메인화면" }],
    });
  } catch (error) {
    Alert.alert("일치하는 정보가 없습니다.");
  }
};

//로그아웃
export const logout = async ({ navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    await axios.post(apiAddress + "/api/v1/user/logout", refreshToken, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{ name: "로그인" }],
    });
  } catch (error) {
    console.log("로그아웃 실패");
  }
};

// 유저 정보 호출
export const UserInfo = async () => {
  try {
    let accessToken = await AsyncStorage.getItem("accessToken");
    let response = await axios.get(apiAddress + "/api/v1/user/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(" 유저 정보 호출 실패");
  }
};

// 패스워드 찾기
export const FindPassword = async (userInfo, { navigation }) => {
  try {
    await axios.post(apiAddress + "/api/v1/user/findpw", userInfo);

    Alert.alert("입력한 이메일로 전송 했습니다.");

    navigation.reset({
      index: 0,
      routes: [{ name: "로그인" }],
    });
  } catch (error) {
    Alert.alert("정보가 일치하지 않습니다.");
  }
};

// 비밀번호 변경
export const ChangePassword = async (data, { navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios.post(apiAddress + "/api/v1/user/changepw", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    Alert.alert("변경에 성공했습니다.");

    navigation.goBack();
  } catch (error) {
    Alert.alert("정보가 일치하지 않습니다.");
  }
};

// 비밀번호 변경
export const ChangeNickName = async (nickName, navigation) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios.post(
      apiAddress + "/api/v1/user/changenickname",
      { nickName: nickName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    Alert.alert("변경에 성공했습니다.");

    navigation.goBack();
  } catch (error) {
    Alert.alert("닉네임 중복");
  }
};

export const UserDelete = async ({ navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios.post(apiAddress + "/api/v1/user/userdelete", {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    Alert.alert("계정 삭제 완료");

    navigation.reset({
      index: 0,
      routes: [{ name: "로그인" }],
    });
  } catch (error) {
    Alert.alert("탈퇴 실패");
  }
};

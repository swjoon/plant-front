import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiAddress = "http://192.168.219.101:8080"


// 회원가입
export const SignUp = async (userData) => {
  try{
    const response = await axios.post(
      apiAddress + "/api/v1/user/register",
      userData
    );
    console.log("회원가입 서버 연결 성공: ", response.data);
    return response;
  } catch (error){
    console.log("회원가입 서버 연결 실패: ", error);
    const response = error.response;
    return response;
  }
}

// 로그인
export const Login = async(loginData, {navigation}) => {
  try{
    const response = await axios.post(
      apiAddress + "/api/v1/user/login",
      loginData
    );
    const data = response.data;
  
    let userId = loginData.userId;

    await AsyncStorage.setItem("userId" , userId);
    await AsyncStorage.setItem("accessToken" , data.accessToken);
    await AsyncStorage.setItem("refreshToken" , data.refreshToken);
    console.log("userID: " + userId + "\naccessToken: " + data.accessToken + "\nrefreshToken: " + data.refreshToken);

    navigation.reset({
      index: 0,
      routes: [{ name: "메인화면" }],
    });
  }catch (error){
    console.error('로그인 실패:', error);
  }
}

// 유저 정보 호출
export const UserInfo = async() =>{
  try{
    let accessToken = await AsyncStorage.getItem("accessToken");
    let response = await axios.get(
      apiAddress + "/api/v1/user/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = response.data;
    return data;
  }catch(error){
    console.log(" 유저 정보 호출 실패")
  }
}

//로그아웃
export const logout = async({navigation}) => {
  try{
    let accessToken = await AsyncStorage.getItem("accessToken")
    let refreshToken = await AsyncStorage.getItem("refreshToken")
    await axios.post(
      apiAddress + "/api/v1/user/logout",
      refreshToken,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await AsyncStorage.clear();

    navigation.reset({
      index:0,
      routes: [{ name: "로그인"}]
    })
  }catch(error){
    console.log("로그아웃 실패")
  }
}


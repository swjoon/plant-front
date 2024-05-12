import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiAddress = "http://192.168.219.101:8080";

// device 등록
export const DeviceSignup = async (deviceData) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.post(
      apiAddress + "/api/v1/addDevice",
      deviceData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("device 등록 성공: ", response.data);
    return response;
  } catch (error) {
    console.log("device 등록 실패: ", error);
    const response = error.response;
    return response;
  }
};

// 홈화면 유저 device 목록 요청
export const GetDeviceList = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(apiAddress + "/api/v1/getDevice", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("data: " + response.data);
    return response.data;
  } catch (error) {
    console.log("device 등록 실패: ", error);
    const response = error.response;
    return response;
  }
};

// device 상세 정보 요청
export const GetDeviceDetail = async (deviceId) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const response = await axios.get(apiAddress + "/api/v1/getdevicedetail", {
      params: {
        deviceId: deviceId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log("device 상세정보 api 호출 실패", error);
  }
};

// 임계값 설정
export const SettingData = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const response = await axios.post(
      apiAddress + `/api/v1/settingdata`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("임계값 업데이트 성공");
    return response;
  } catch (error) {
    console.log("device 상세정보 api 호출 실패", error);
  }
};

// 조명설정
export const SettingLed = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const response = await axios.post(
      apiAddress + `/api/v1/ledV`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("led 업데이트 성공");
    return 200;
  } catch (error) {
    console.log("Led 조절 api 호출 실패", error);
    return error;
  }
};

// now 데이터 불러오기
export const GetNowData = async(deviceId)=>{
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const response = await axios.get(apiAddress + "/api/v1/sensor/nowdata", {
      params: {
        deviceId: deviceId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log("now Data api 호출 실패", error);
  }
}

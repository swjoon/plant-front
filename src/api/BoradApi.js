import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiAddress = "http://192.168.219.101:8080";

export const setBoard = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(data);
    const response = await axios.post(apiAddress + "/api/v1/board/post", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("게시판 등록 성공 ", response.data);
    return response;
  } catch (error) {
    console.log("게시판 등록 실패: ", error);
    const response = error.response;
    return response;
  }
};

export const getBoard = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(apiAddress + "/api/v1/board/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("게시판 불러오기 성공 ", response.data);
    return response;
  } catch (error) {
    console.log("게시판 불러오기 실패: ", error);
    const response = error.response;
    return response;
  }
};

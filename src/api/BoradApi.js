import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Address from "./config";

const apiAddress = Address;

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

export const boardDelete = async (no) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log(no);
      const response = await axios.post(
        apiAddress + "/api/v1/board/delete",
        { no: no },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("게시판 삭제 성공 ", response.data);
      return response;
    } catch (error) {
      console.log("게시판 삭제 실패: ", error);
      const response = error.response;
      return response;
    }
  };

export const getBoardDetail = async (no) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(apiAddress + "/api/v1/board/detail", {
      params: {
        no: no,
      },
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

export const getComment = async (no) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.get(apiAddress + "/api/v1/board/comment", {
      params: {
        no: no,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("댓글 불러오기 성공 ", response.data);
    return response;
  } catch (error) {
    console.log("댓글 불러오기 실패: ", error);
    const response = error.response;
    return response;
  }
};

export const postComment = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await axios.post(
      apiAddress + "/api/v1/board/comment",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("댓글 작성 성공 ", response.data);
    return response;
  } catch (error) {
    console.log("댓글 작성 실패: ", error);
    const response = error.response;
    return response;
  }
};

export const commentDelete = async (no) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(no);
    const response = await axios.post(
      apiAddress + "/api/v1/board/comment/delete",
      { no: no },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("댓글 삭제 성공 ", response.data);
    return response;
  } catch (error) {
    console.log("댓글 삭제 실패: ", error);
    const response = error.response;
    return response;
  }
};

export const UpdateBoard = async (No,data) => {
  console.log(No, data)
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(data);
    const response = await axios.put(apiAddress + `/api/v1/board/post?No=${No}`, data, {
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
}
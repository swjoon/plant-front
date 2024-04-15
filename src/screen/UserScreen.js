import { StyleSheet, View, Button, Text } from "react-native";
import { UserInfo, logout } from "../api/UserApi";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const UserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const logoutHandler = async () => {
    try {
      await logout({ navigation });
    } catch (error) {
      console.log("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserInfo();
        console.log("page userinfodata: ", data);
        setUserData(data)
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{userData.userId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>이름:</Text>
            <Text style={styles.value}>{userData.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>닉네임:</Text>
            <Text style={styles.value}>{userData.nickname}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>생일:</Text>
            <Text style={styles.value}>{userData.birth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>생성날짜:</Text>
            <Text style={styles.value}>{userData.createdDate}</Text>
          </View>
        </View>
      )}
      <Button title="로그아웃" onPress={logoutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "left",
  },
  value: {
    flex: 2,
    fontSize: 16,
    textAlign: "left",
  },
});

export default UserScreen;

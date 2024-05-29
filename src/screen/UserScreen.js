import { StyleSheet, View, Text, Alert } from "react-native";
import { UserDelete, UserInfo, logout } from "../api/UserApi";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const UserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserInfo();
        console.log("page userinfodata: ", data);
        setUserData(data);
      } catch (error) {}
    };
    fetchData();
  }, [isFocused]);

  if (!userData) {
    return null;
  }

  const handleWithdrawal = async() => {
    Alert.alert(
      "회원 탈퇴",
      "정말로 회원을 탈퇴하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            handleUserDelete()
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const logoutHandler = async () => {
    await logout({ navigation });
  };
  const handlePasswordChange = () => {
    navigation.navigate("비밀번호변경");
  };

  const handleNickNameChange = () => {
    const nick = userData.nickname;
    navigation.navigate("닉네임변경", {nick}); 
  };

  const handleUserDelete = async () => {
      await UserDelete({navigation});
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.divider} /> */}
      <View style={styles.userContainer}>
        <View>
          <View>
            <Text style={styles.titleText}>계정</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{userData.userId}</Text>
          </View>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={handlePasswordChange}
          >
            <Text style={styles.buttonText}>비밀번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={handleNickNameChange}
          >
            <Text style={styles.buttonText}>닉네임 변경</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View>
          <View>
            <Text style={styles.titleText}>유저정보</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>이름:</Text>
            <Text style={styles.value}>{userData.username}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>닉네임:</Text>
            <Text style={styles.value}>{userData.nickname}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>생일:</Text>
            <Text style={styles.value}>{userData.birth}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <View>
            <Text style={styles.titleText}>기타</Text>
          </View>
          <TouchableOpacity style={styles.outButton} onPress={handleWithdrawal}>
            <Text style={styles.buttonText}>회원탈퇴</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outButton} onPress={logoutHandler}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  outButton: {
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  userContainer: {
    borderRadius: 5,
    padding: 10,
    marginTop: "10%",
    marginBottom: "10%",
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "left",
  },
  value: {
    flex: 2,
    fontSize: 16,
    textAlign: "right",
  },
  passwordButton: {
    marginBottom: 10,
    width: "100%",
  },
});

export default UserScreen;

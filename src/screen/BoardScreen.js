import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { getBoard } from "../api/BoradApi";

const BoardScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoard();
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("set data 데이터 불러오기 실패", error);
      }
    };
    fetchData();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("게시판",{ no: item.no, nickName: item.nickName, commentcount: item.commentCount})}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text
        style={styles.itemInfo}
      >{`작성자: ${item.nickName} | 작성일: ${item.createdDate} | 댓글: ${item.commentCount}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("글쓰기")}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="black"
            style={styles.addButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButtonContainer: {
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 1, // 다른 요소 위로 올라오도록 설정
  },
  addButton: {
    // 필요한 스타일 지정
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemInfo: {
    fontSize: 14,
    color: "#666",
  },
});

export default BoardScreen;

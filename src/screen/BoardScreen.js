import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';

const BoardScreen = ({ navigation }) => {
  const data = [
    {
      id: 1,
      title: "test",
      author: "shim",
      date: "2024-05-02",
      comments: 0,
    },
    {
      id: 2,
      title: "test2",
      author: "shim",
      date: "2024-05-02",
      comments: 0,
    },
    // Add more sample data as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text
        style={styles.itemInfo}
      >{`작성자: ${item.author} | 작성일: ${item.date} | 댓글: ${item.comments}`}</Text>
    </TouchableOpacity>
  );

   return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("글작성")}>
          <AntDesign name="pluscircleo" size={24} color="black" style={styles.addButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate("게시판")}>
        <Text>디테일</Text>
      </TouchableOpacity>
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
    position: 'absolute',
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

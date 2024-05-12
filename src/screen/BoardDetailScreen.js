import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getBoardDetail, postComment } from "../api/BoradApi";
import { AntDesign } from "@expo/vector-icons";

const BoardDetailScreen = ({ navigation, route }) => {
  const { no, nickName, createdDate, commentCount } = route.params;
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardDetail(no);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("게시판 데이터 불러오기 실패", error);
      }
    };
    fetchData();
  }, [isFocused]);

  const handleSubmit = async () => {
    try {
      comment = {
        boardNo: no,
        content: comment,
      };
      console.log(comment);
      await postComment(comment);
    } catch (error) {
      console.error("댓글작성 실패");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.info}>
          작성자: {nickName} | 등록일: {createdDate}
        </Text>
        <Text style={styles.body}>{data.content}</Text>
        <View style={styles.comment}>
          <AntDesign
            name="message1"
            size={24}
            color="black"
            style={styles.commentIcon}
          />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.commentTitle}>댓글</Text>

        {/* Render comments here */}

        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 작성하세요"
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleSubmit}>
            <Text style={styles.commentButtonText}>등록</Text>
          </TouchableOpacity>
        </View>
        {/* Render comments here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexGrow: 1,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  body: {
    fontSize: 16,
    marginBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    marginRight: 5,
  },
  commentCount: {
    fontSize: 16,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BoardDetailScreen;

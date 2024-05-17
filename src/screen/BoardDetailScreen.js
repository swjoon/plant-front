import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { boardDelete, commentDelete, getBoardDetail, getComment, postComment } from "../api/BoradApi";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RenderItem = ({ item, role, saveNickName, handleCommentDelete }) => {
  const [showCommentOptions, setShowCommentOptions] = useState(false);

  const handleToggleCommentOptions = () => {
    setShowCommentOptions(!showCommentOptions);
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentButton}>
        <Text
          style={styles.itemTitle}
        >{`${item.nickName} | ${item.createdDate}`}</Text>
        <TouchableOpacity
          style={styles.commentListButton}
          onPress={handleToggleCommentOptions}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButton}>
        <Text style={styles.itemInfo}>{`${item.content}`}</Text>
        {showCommentOptions && (
          <View style={styles.commentOptions}>
            {(item.nickName == saveNickName || role == "ADMIN") && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleCommentDelete(item.no)}
              >
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const BoardDetailScreen = ({ route, navigation }) => {
  const { no, nickName, createdDate, commentCount } = route.params;
  const [comment, setComment] = useState("");
  const [data, setData] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [boardEqual, setBoardEqual] = useState(false);
  const [saveNickName, setSaveNickName] = useState("");
  const [Role, setRole] = useState("");
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await getBoardDetail(no);
      const commentResponse = await getComment(no);
      const name = await AsyncStorage.getItem("nickName");
      const role = await AsyncStorage.getItem("role");
      setData(response.data);
      setCommentList(commentResponse.data);
      setRole(role);
      if (role == "ADMIN" || name == nickName) setBoardEqual(true);
      setSaveNickName(name);
    } catch (error) {
      console.error("게시판 데이터 불러오기 실패", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const commentData = {
        boardNo: no,
        content: comment,
      };
      console.log(commentData);
      await postComment(commentData);
      setComment("");
      // 댓글 작성 후 페이지 리셋
      fetchData();
    } catch (error) {
      console.error("댓글작성 실패", error);
    }
  };

  const handleBoardUpdate = async (no, boardTitle, boardBody) => {
    navigation.navigate("글수정", {no , boardTitle, boardBody});
  }

  const handleBoardDelete = async (no) => {
    try {
      await boardDelete(no);
      navigation.goBack();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  }

  const handleCommentDelete = async (no) => {
    try {
      await commentDelete(no);
      fetchData();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>게시판</Text>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text
          style={styles.info}
        >{`작성자: ${nickName} | 등록일: ${createdDate}`}</Text>
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
        <FlatList
          data={commentList}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              role={Role}
              saveNickName={saveNickName}
              handleCommentDelete={handleCommentDelete}
            />
          )}
          contentContainerStyle={styles.commentList}
        />
      </View>
      {showOptions && (
        <View style={styles.optionContainer}>
          {/* <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowOptions(!showOptions)} // 수정된 부분
          >
            <Text>신고</Text>
          </TouchableOpacity> */}
          {boardEqual && (
            <View>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleBoardUpdate(no , data.title, data.content)}>
                <Text>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleBoardDelete(no)}>
                <Text>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 작성하세요"
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
        <TouchableOpacity
          style={styles.commentPostButton}
          onPress={handleSubmit}
        >
          <Text style={styles.commentButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: "12%",
    marginBottom: "12%",
  },
  backButton: {},
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listButton: {},
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  commentList: {
    flexGrow: 1,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemInfo: {
    fontSize: 14,
    color: "#666",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  commentPostButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionContainer: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  commentButton: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  commentListButton: {
    right: 10,
  },
  commentOptions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 8,
    marginTop: 5,
  },
  deleteButton: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentOptionButton: {
    marginLeft: 10,
  },
});

export default BoardDetailScreen;

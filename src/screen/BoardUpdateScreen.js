import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UpdateBoard, setBoard } from "../api/BoradApi";

const BoardUpdateScreen = ({ route, navigation }) => {
  const { no, boardTitle, boardBody } = route.params;
  const [title, setTitle] = useState(boardTitle);
  const [body, setBody] = useState(boardBody);
  const [No, setNo] = useState(no);

  const handleSubmit = async () => {
    const data = {
      title: title,
      content: body,
    };
    try {
      await UpdateBoard(No,data);
      navigation.goBack();
    } catch (error) {
      console.error("게시글 수정 실패" ,error)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="close"
          size={24}
          color="black"
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>게시글 수정</Text>
      <TextInput
        style={styles.input}
        placeholder="제목을 입력하세요"
        onChangeText={(text) => setTitle(text)}
        value={title}
      >
      </TextInput>
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="내용을 입력하세요"
        onChangeText={(text) => setBody(text)}
        value={body}
        multiline
      >
      </TextInput>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>수정 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    top: 40,
    paddingBottom: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "18%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  bodyInput: {
    height: "40%",
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BoardUpdateScreen;

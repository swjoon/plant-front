import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BoardDetailScreen = ({ navigation, route }) => {
  const [nickName, createdDate, commentCount] = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>test</Text>
        <Text style={styles.info}>
          작성자: {nickName} | 등록일: {createdDate}
        </Text>
        <Text style={styles.body}>test</Text>
        <View style={styles.divider} />
        <Text style={styles.commentTitle}>댓글</Text>
        {/* Render comments here */}
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 작성하세요"
          />
          <TouchableOpacity style={styles.commentButton}>
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
    marginBottom: 15,
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

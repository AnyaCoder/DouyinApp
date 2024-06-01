import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Avatar from "../avatar/Avatar";
import HeartBtn from "../button/HeartBtn";

const CommentItem = ({ username, comment, commentLikes, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.commentItem}>
      {/* 头像 */}
      <Avatar uri="https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg" />
      {/* 评论的内容 */}
      <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {username}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>{comment}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      {/* 心 */}

      <HeartBtn number={commentLikes} />
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  deleteText: {
    fontSize: 15,
    color: "red",
  },
});

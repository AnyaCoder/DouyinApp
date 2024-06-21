import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { postData } from "./utils";
// 引入组件
import Avatar from "../avatar/Avatar";
import HeartBtn from "../button/HeartBtn";
import IconTextButton from "../button/IconTextButton";
import RotateAvatar from "../avatar/RotateAvatar";

import OpenCommentContext from "../../context/OpenCommentContext";
import { UserContext } from "../../context/UserContext";

const VideoPlay = ({ paused, videoItem, commentsNum }) => {
  const openComment = React.useContext(OpenCommentContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(videoItem.likes);
  const [uri, setUri] = useState(
    `http://10.0.2.2:3001/UploadedVideos/${videoItem.videoPath}`
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    const view_url = `http://10.0.2.2:3001/api/videos/${videoItem.videoID}/view`;
    postData(view_url, {});
  }, []);

  const handleFollowToggle = async ({ userId, followedUserId }) => {
    const url = "http://10.0.2.2:3001/api/follows";
    const options = {
      method: isFollowing ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, followedUserId }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setIsFollowing(!isFollowing);
        console.log(
          `${userId} Successfully ${
            isFollowing ? "unfollowed" : "followed"
          } the user ${followedUserId}!`
        );
      } else {
        console.error("Failed to follow/unfollow the user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ flex: 1, bottom: 16 }}>
      {/* 顶部状态栏 */}
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      {/* 视频播放 */}
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: uri,
          },
        }}
        style={styles.video}
      />
      {/* 左下角标题和描述 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>@{videoItem.username}</Text>
        <Text style={styles.title}>{videoItem.title}</Text>
        <Text style={styles.description}>{videoItem.description}</Text>
      </View>
      {/* 图标按钮 */}
      <View style={styles.btns}>
        <View style={styles.btnItem}>
          <Avatar uri="https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg" />
        </View>
        <View style={styles.btnItem}>
          <IconTextButton
            name="people"
            text={isFollowing ? "已关注" : "+关注"}
            onPress={() =>
              handleFollowToggle({
                userId: user.userID,
                followedUserId: videoItem.userID,
              })
            }
          />
        </View>
        <View style={styles.btnItem}>
          <HeartBtn
            number={likes}
            videoID={videoItem.videoID}
            setLikes={setLikes}
          />
        </View>
        <View style={styles.btnItem}>
          <IconTextButton
            name="comment"
            text={commentsNum}
            onPress={() => {
              // 打开评论框
              openComment(true);
            }}
          />
        </View>
        <View style={styles.btnItem}>
          <IconTextButton name="share" text={videoItem.views} />
        </View>
        <View style={styles.btnItem}>
          <RotateAvatar
            size="sm"
            border={10}
            uri="https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg"
          />
        </View>
      </View>
    </View>
  );
};

export default VideoPlay;

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  textContainer: {
    position: "absolute",
    left: 16,
    bottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 20,
    marginTop: 4,
  },
  btns: {
    position: "absolute",
    right: 2,
    bottom: 100,
    alignItems: "center",
  },
  btnItem: {
    marginTop: 20, // 按钮的上下间距
  },
});

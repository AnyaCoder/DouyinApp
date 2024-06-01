import React, { useEffect, useState } from "react";
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
import { fetchData } from "./utils";
// 引入组件
import Avatar from "../avatar/Avatar";
import HeartBtn from "../button/HeartBtn";
import IconTextButton from "../button/IconTextButton";
import RotateAvatar from "../avatar/RotateAvatar";

import OpenCommentContext from "../../context/OpenCommentContext";

const VideoPlay = ({ paused, videoItem, commentsNum }) => {
  const openComment = React.useContext(OpenCommentContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [videoID, setVideoID] = useState(videoItem.videoID);
  const [views, setViews] = useState(videoItem.views);
  const [likes, setLikes] = useState(videoItem.likes);
  const [uri, setUri] = useState(
    `http://10.0.2.2:3001/UploadedVideos/${videoItem.videoPath}`
  );

  const handleFollowToggle = async (userId, followedUserId) => {
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
          `Successfully ${isFollowing ? "unfollowed" : "followed"} the user!`
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
      {/* 图标按钮 */}
      <View style={styles.btns}>
        <View style={styles.btnItem}>
          <Avatar uri="https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg" />
        </View>
        <View style={styles.btnItem}>
          <IconTextButton
            name="people"
            text={isFollowing ? "已关注" : "+关注"}
            onPress={() => handleFollowToggle(1, 2)}
          />
        </View>
        <View style={styles.btnItem}>
          <HeartBtn number={likes} videoID={videoID} setLikes={setLikes} />
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
          <IconTextButton name="share" text={views} />
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

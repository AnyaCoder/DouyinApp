import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Text,
  Alert,
} from "react-native";
// 引入组件
import VideoList from "../../../components/video/VideoList";
import ViewPager from "react-native-pager-view";
import IconButton from "../../../components/button/IconButton";
import TextButton from "../../../components/button/TextButton";
import CommentItem from "../../../components/comment/CommentItem";
import Panel from "../../../components/comment/Panel";

import OpenCommentContext from "../../../context/OpenCommentContext";
import { fetchData } from "../../../components/video/utils";
// 创建一个 ref
const viewPageRef = React.createRef();

const Video = () => {
  // 白线左边的位置
  const [lineLeft, setLineLeft] = React.useState(new Animated.Value(0));

  // 评论框是否打开
  const [openComment, setOpenComment] = React.useState(false);

  const [comments, setComments] = useState([]);

  const [videoInfo, setVideoInfo] = useState({});

  const getComments = async (videoID) => {
    const url = `http://10.0.2.2:3001/api/comments/video/${videoID}`;
    console.log(url);
    const mapper = (data) =>
      data.map((item) => ({ id: item.commentID, ...item }));
    const result = await fetchData(url, "GET", mapper);
    setComments(result);
  };

  useEffect(() => {
    // 初始化评论
    getComments(`5`);
  }, []);

  // 更新, 钩子函数， 随着videoInfo变化而改变
  useEffect(() => {
    console.log(`videoInfo: `, videoInfo);
    if (videoInfo.videoID) {
      getComments(videoInfo.videoID);
      console.log(comments);
    }
  }, [videoInfo]);

  const handleSend = async (inputText) => {
    console.log("input: ", inputText);
    const url = `http://10.0.2.2:3001/api/comments`;
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userID: 1,
        videoID: videoInfo.videoID,
        content: inputText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getComments(videoInfo.videoID);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3001/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <>
      <OpenCommentContext.Provider value={setOpenComment}>
        {/* 视频列表 */}
        <ViewPager
          onPageSelected={(e) => {
            let toValue = e.nativeEvent.position === 0 ? 0 : 60;
            Animated.timing(lineLeft, {
              toValue,
              duration: 200, // 0.2s
              useNativeDriver: true, // 是否启用原生动画驱动（left动画不支持原生）
            }).start();
          }}
          ref={viewPageRef}
          style={styles.container}
          // initialPage: 最开始使用哪个页面
          initialPage={0}
        >
          {/* 关注 */}
          <View key="gz">
            <VideoList
              setVideoInfo={setVideoInfo}
              commentsNum={comments.length}
            />
          </View>
          {/* 推荐 */}
          <View key="tj">
            <VideoList
              setVideoInfo={setVideoInfo}
              commentsNum={comments.length}
            />
          </View>
        </ViewPager>
      </OpenCommentContext.Provider>

      {/* 按钮列表 */}
      <View style={styles.btnList}>
        <IconButton name="live-tv" color="white" />
        <View style={styles.textBtnList}>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: "row",
              paddingLeft: 0,
            }}
          >
            <TextButton
              style={[
                styles.textBtnLabel,
                {
                  paddingRight: "5%",
                },
              ]}
              title="关注"
              onPress={() => {
                // 切换屏幕内容
                viewPageRef.current.setPage(0);
                // 白线移动的动画
                Animated.timing(lineLeft, {
                  toValue: 0,
                  duration: 200, // 0.2s
                  useNativeDriver: true, // 是否启用原生动画驱动（left动画不支持原生）
                }).start();
              }}
            />
            <TextButton
              style={styles.textBtnLabel}
              title="推荐"
              onPress={() => {
                // 切换屏幕内容
                viewPageRef.current.setPage(1);
                // 白线移动的动画
                Animated.timing(lineLeft, {
                  toValue: 60,
                  duration: 200, // 0.2s
                  useNativeDriver: true, // 是否启用原生动画驱动（left动画不支持原生）
                }).start();
              }}
            />

            <Animated.View
              style={[
                styles.line,
                {
                  transform: [
                    {
                      translateX: lineLeft,
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>
        <IconButton name="search" color="white" />
      </View>

      {/* 评论 */}
      <Panel
        open={openComment}
        onClose={() => {
          setOpenComment(false);
        }}
        commentsNum={comments.length}
        handleSend={handleSend}
      >
        <FlatList
          data={comments}
          keyExtractor={(item) => item.commentID}
          renderItem={({ item }) => (
            <CommentItem
              username={item.username}
              comment={item.content}
              commentLikes={"666"}
              onDelete={() => handleDeleteComment(item.commentID)}
            />
          )}
        />
      </Panel>
    </>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnList: {
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    top: 50,
    flexDirection: "row", // 子元素横着
  },
  textBtnList: {
    flex: 1, // 沾满所有可用空间
    flexDirection: "row", // 子元素横向排列
    alignItems: "center",
    justifyContent: "center",
  },
  textBtnLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    backgroundColor: "white",
    height: 5,
    width: 35,
    position: "absolute",
    bottom: -8,
    left: 0,
  },
});

import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Dimensions, StyleSheet, Text } from "react-native";
import VideoPlay from "./VideoPlay";
import { fetchData } from "./utils";
import { UserContext } from "../../context/UserContext";
// 获取屏幕的高度
const { height } = Dimensions.get("window");

// 模拟一个数据
const data = [1, 2];

const VideoList = ({ setVideoInfo, commentsNum }) => {
  const [current, setCurrent] = useState(0);
  const [videos, setVideos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getVideos = async () => {
      const url = `http://10.0.2.2:3001/api/videos`;
      const mapper = (data) =>
        data.map((item) => ({ id: item.userID, ...item }));
      const result = await fetchData(url, "GET", mapper);

      // 获取每个userID的用户名并加入到result的对应项
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const userUrl = `http://10.0.2.2:3001/api/users/${item.userID}`;
          const userResponse = await fetch(userUrl);
          const userData = await userResponse.json();
          return { ...item, username: userData.username };
        })
      );
      setVideos(updatedResult);
    };

    getVideos();
  }, []);

  if (videos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>还没有任何视频哦！</Text>
      </View>
    );
  }

  return (
    <FlatList
      pagingEnabled={true}
      data={videos}
      onMomentumScrollEnd={(e) => {
        let index = Math.floor((e.nativeEvent.contentOffset.y + 2.0) / height);
        setVideoInfo(videos[index]);
        setCurrent(index);
      }}
      renderItem={({ item, index }) => (
        <View style={{ height: height, top: 16 }}>
          <VideoPlay
            paused={index !== current}
            videoItem={item}
            commentsNum={commentsNum}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // 设置背景色为深色
  },
  emptyText: {
    color: "#fff", // 设置文字颜色为白色
    fontSize: 18,
  },
});

export default VideoList;

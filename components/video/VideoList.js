import React, { useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import VideoPlay from "./VideoPlay";
import { fetchData } from "./utils";

// 获取屏幕的高度
const { height } = Dimensions.get("window");

// 模拟一个数据
const data = [1, 2];

const VideoList = ({ setVideoInfo, commentsNum }) => {
  const [current, setCurrent] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const url = "http://10.0.2.2:3001/api/videos/1";
      const mapper = (data) =>
        data.map((item) => ({ id: item.userID, ...item }));
      const result = await fetchData(url, "GET", mapper);
      setVideos(result);
      console.log(result);
    };

    getVideos();
  }, []);

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

export default VideoList;

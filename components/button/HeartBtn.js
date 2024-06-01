import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
  StyleSheet,
} from "react-native";

import rh from "../../images/heart-r.png";
import wh from "../../images/heart-w.png";

const HeartBtn = ({ number, videoID, setLikes }) => {
  // 当前的心， false：白  true：红色
  const [heart, setHeart] = useState(false);

  // 定义心缩放的值
  const [scale] = useState(new Animated.Value(0));

  // 创建动画
  const ani = useMemo(
    () =>
      Animated.timing(scale, {
        toValue: 3,
        duration: 300,
        useNativeDriver: true,
      }),
    [scale]
  );

  const handleLike = async () => {
    try {
      const url = `http://10.0.2.2:3001/api/videos/${videoID}/like`;
      let response;

      if (heart) {
        response = await fetch(url, {
          method: "DELETE",
        });
      } else {
        response = await fetch(url, {
          method: "POST",
        });
      }

      if (response.ok) {
        // 动画执行
        ani.start(() => {
          scale.setValue(0);
        });
        // 切换心
        setHeart(!heart);
        // 更新赞的数量
        setLikes((prevLikes) => (heart ? prevLikes - 1 : prevLikes + 1));
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          console.log();
          handleLike();
        }}
      >
        <Animated.Image
          source={heart ? rh : wh}
          style={{
            transform: [
              {
                scale: scale.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [1, 0.6, 1.4, 1],
                }),
              },
            ],
            left: 0,
            margin: 5,
          }}
        />
      </TouchableNativeFeedback>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {number}
      </Text>
    </View>
  );
};

export default HeartBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "col", // 垂直排列
    alignItems: "center", // 垂直居中
    justifyContent: "center", // 水平居中
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10, // 添加水平内边距以支持文本展开
  },
});

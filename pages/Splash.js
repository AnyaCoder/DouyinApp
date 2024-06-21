// pages/Splash.js

import React from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";

const SplashPage = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      // replace: 销毁当前页, 跳转到下个页面
      navigation.replace("Login"); // 修改为跳转到登录页面
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.splash}>
      <StatusBar hidden={true} />
      <Image
        source={require("../images/splash.png")}
        style={styles.image}
        resizeMode="contain" // 使用 contain 确保图片按比例缩放
      />
    </View>
  );
};

export default SplashPage;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C0E1B",
  },
  image: {
    width: "100%", // 确保图片宽度填满屏幕
    height: "100%", // 确保图片高度填满屏幕
  },
});

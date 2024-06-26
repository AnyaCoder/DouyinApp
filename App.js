// App.js

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OpenDrawerContext from "./context/OpenDrawerContext";
import { UserProvider } from "./context/UserContext";
import Menu from "./components/me/Menu";

// 创建Stack导航器
const Stack = createStackNavigator();
// 管理封面页和主页
import SplashPage from "./pages/Splash";
import IndexPage from "./pages/main/Index";
import LoginPage from "./pages/Login"; // 新增登录页面的导入
import RegisterPage from "./pages/Register"; // 新增注册页面的导入

// 获取屏幕的宽度
const { width } = Dimensions.get("window");

const App = () => {
  // 定义整体移动动画的变量
  const [move, setMove] = useState(new Animated.Value(0));
  // 定义一个状态数据， 用来控制这个层的显示和隐藏
  const [open, setOpen] = useState(false);

  const [movePan, setMovePan] = useState({});

  // 打开抽屉页函数
  const openDrawer = useCallback(() => {
    setOpen(true);
    // 执行动画
    Animated.timing(move, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [move]);

  useEffect(() => {
    // 右滑隐藏右侧导航
    let pan = PanResponder.create({
      // 要求成为响应者
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);
        if (gestureState.dx >= 80) {
          // 执行动画
          Animated.timing(move, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            // 当动画执行完之后隐藏层
            setOpen(false);
          });
        }
      },
    });

    setMovePan(pan);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: move.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -1 * width * 0.75],
                }),
              },
            ],
          }}
        >
          {/* 把 openDrawer 这个函数传递给所有子组件 */}
          <OpenDrawerContext.Provider value={openDrawer}>
            <UserProvider>
              {/* 子页面, 加上navigation container就会显示导航栏*/}
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  {/* 封面 */}
                  <Stack.Screen name="Splash" component={SplashPage} />
                  {/* 登录页面 */}
                  <Stack.Screen name="Login" component={LoginPage} />
                  {/* 注册页面 */}
                  <Stack.Screen name="Register" component={RegisterPage} />
                  {/* 首页 */}
                  <Stack.Screen name="Index" component={IndexPage} />
                </Stack.Navigator>
              </NavigationContainer>
            </UserProvider>
          </OpenDrawerContext.Provider>

          {/* 把整个APP盖上 */}
          {open && (
            <TouchableWithoutFeedback
              onPress={() => {
                // 执行动画
                Animated.timing(move, {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: true,
                }).start(() => {
                  // 当动画执行完之后隐藏层
                  setOpen(false);
                });
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              />
            </TouchableWithoutFeedback>
          )}
        </Animated.View>

        {/* 抽屉导航 */}
        <Animated.View
          {...movePan.panHandlers}
          style={{
            position: "absolute",
            right: "-75%",
            transform: [
              {
                translateX: move.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -1 * width * 0.75],
                }),
              },
            ],
            top: 0,
            width: "75%",
            height: "100%",
            backgroundColor: "black",
          }}
        >
          <Menu />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});

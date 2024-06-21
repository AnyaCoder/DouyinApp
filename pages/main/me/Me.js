// pages/me/Me.js
import React, { useRef, useState, useEffect, useContext, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Animated,
  FlatList,
  PanResponder,
  TouchableOpacity,
} from "react-native";

import {
  Dialog,
  Portal,
  TextInput,
  Button as PaperButton,
  Provider as PaperProvider,
} from "react-native-paper";
import Avatar from "../../../components/avatar/Avatar";
import Drawer from "../../../components/me/Drawer";
import ViewPager from "react-native-pager-view";
import TextButton from "../../../components/button/TextButton";
import IconButton from "../../../components/button/IconButton";
import Icon from "react-native-vector-icons/MaterialIcons";

// 引入 context
import OpenDrawerContext from "../../../context/OpenDrawerContext";
import { UserContext } from "../../../context/UserContext";

// 模拟的数据
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Me = () => {
  const openDrawer = React.useContext(OpenDrawerContext);
  const { user } = useContext(UserContext);

  // 滑动框的引用
  const viewRef = useRef();

  // 当前被选中的框的下标
  const [activeIndex, setActiveIndex] = useState(0);

  // 定义动画变量
  const [move] = useState(new Animated.Value(0));

  const [movePan, setMovePan] = useState({});

  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [videoID, setVideoID] = useState("-1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");

  const [userStats, setUserStats] = useState({});

  const getData = async () => {
    try {
      const resp_userVideos = await fetch(
        `http://10.0.2.2:3001/api/videos/${user.userID}`,
        {
          method: "GET",
          body: null,
        }
      );
      // Check if the response is successful

      const userVideosData = await resp_userVideos.json();
      const dataArray = Array.isArray(userVideosData) ? userVideosData : [];
      const mappedRows = dataArray.map((item, index) => ({
        id: item.userID,
        ...item,
      }));
      setData(mappedRows); // 确保为数组类型

      const resp_userStats = await fetch(
        `http://10.0.2.2:3001/api/users/stats/${user.userID}`,
        {
          method: "GET",
          body: null,
        }
      );
      const statsData = await resp_userStats.json();
      setUserStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // 在出错时设置一个空数组
    }
  };

  const showDialog = (item) => {
    setSelectedItem(item);
    setVideoID(item.videoID.toString());
    setTitle(item.title);
    setDescription(item.description);
    setVideoPath(item.videoPath);
    setThumbnailPath(item.thumbnailPath);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3001/api/videos/${videoID}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            videoPath,
            thumbnailPath,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Deleted Video (ID: ${videoID}), response: ${response.json()}`
      );
    } catch (error) {
      console.error("Error handleDelete:", error);
    }

    getData();
    hideDialog();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3001/api/videos/${videoID}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Updated Video (ID: ${videoID}), response: ${response.json()}`
      );
    } catch (error) {
      console.error("Error handleUpdate:", error);
    }
    getData();
    hideDialog();
  };

  // 使用 useEffect 在组件加载时获取数据
  useEffect(() => {
    getData();
  }, []);

  const tabToGetData = () => {
    getData();
  };

  // 监听当前下标，只要下标改变就执行动画
  useEffect(() => {
    Animated.timing(move, {
      toValue: activeIndex, // 把线
      duration: 100,
      useNativeDriver: false,
    }).start();

    // 左滑显示右侧导航
    let pan = PanResponder.create({
      // 要求成为响应者：
      // 开启手势滑动功能
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,

      // 不需要获取其他点击等事件
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // 滑动结束时触发
      // gestureState.dx : 结束的坐标 - 开始的坐标 （整数：向右滑动的距离， 负数： 向左滑动的距离）
      // gestureState.dy : 结束的坐标 - 开始的坐标 （整数：向下滑动的距离， 负数： 向上滑动的距离）
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState);
        if (gestureState.dx <= -80) {
          // 执行动画
          openDrawer();
        }
      },
    });

    setMovePan(pan);
  }, [activeIndex, move]);

  return (
    <View style={{ flex: 1, backgroundColor: "#161721" }}>
      <View {...movePan.panHandlers}>
        {/* 顶部背景图 */}

        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.background}
            source={{
              uri: "https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg",
            }}
          >
            <TouchableOpacity
              style={{ ...styles.button, left: "20%", top: 30 }}
            >
              <Text style={styles.buttonText}>编辑资料</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, left: "160%", top: 30 }}
            >
              <Text style={styles.buttonText}>新消息2</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/* 头像 */}
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 100,
          }}
        >
          <View
            style={{
              top: -10,
            }}
          >
            <Avatar
              border={5}
              size="big"
              uri="https://c-ssl.duitang.com/uploads/blog/202203/07/20220307144348_fdfea.jpg"
            />
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
              {user.username}
            </Text>
            <Text style={{ color: "white", marginTop: 5 }}>
              抖音号：{user.userID}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            这是什么？我的个性签名啊！
          </Text>

          {/* 标签 */}
          <View
            style={{
              marginTop: 8,
              marginBottom: 8,
              flexDirection: "row",
            }}
          >
            <Tags tagTxt="北京" />
            <Tags tagTxt="海淀" />
            <Tags tagTxt="+增加性别、学校等标签" />
          </View>

          {/* 获赞 关注 粉丝 */}
          <View
            style={{
              marginTop: 2,
              marginBottom: 18,
              flexDirection: "row",
              justifyContent: "space-between", // 使用 space-between 来分散对齐
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <NumText number={userStats.likes} text="获赞" />
              <NumText number={userStats.friends} text="朋友" />
              <NumText number={userStats.following} text="关注" />
              <NumText number={userStats.followers} text="粉丝" />
            </View>
            <View>
              <TextButton
                style={{
                  color: "white",
                  fontSize: 20, // 较小的字体大小
                  fontWeight: "bold",
                  top: 5,
                  right: 25,
                  paddingVertical: 10, // 上下内边距
                  paddingHorizontal: 15, // 左右内边距
                  borderRadius: 10, // 圆角
                  backgroundColor: "#999999", // 按钮背景颜色
                }}
                title="添加朋友"
                onPress={() => {
                  console.log("添加朋友成功！");
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* 三列切换： 作品、动态、喜欢 */}
      <TabBar
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        viewRef={viewRef}
        tabToGetData={tabToGetData}
      />

      {/* 作品、动态、喜欢 */}
      <MyViewPager
        data={data}
        viewRef={viewRef}
        setActiveIndex={setActiveIndex}
        showDialog={showDialog}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>编辑项目信息</Dialog.Title>
          <Dialog.Content>
            <TextInput label="视频ID" value={videoID} editable={false} />
            <TextInput
              label="标题"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              label="描述"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View style={styles.buttonContainer}>
              <Button onPress={handleDelete} title="删除"></Button>
              <View style={styles.buttonSpacing} />
              <Button onPress={hideDialog} title="取消"></Button>
              <View style={styles.buttonSpacing} />
              <Button onPress={handleUpdate} title="更改"></Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* 右侧抽屉 */}
      <View
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          backgroundColor: "black",
          borderRadius: 16,
          padding: 4,
        }}
      >
        <IconButton
          name="apps"
          color="white"
          size={25}
          onPress={() => {
            openDrawer();
          }}
        />
      </View>
    </View>
  );
};

const CustomImageBackground = memo(({ uri, likes, views }) => (
  <ImageBackground
    style={{
      flex: 1,
      height: 200,
      width: "100%",
    }}
    source={{ uri }}
  >
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 10,
        justifyContent: "flex-start",
      }}
    >
      <GoodsItem color="white" icon="airplay" title={views} />
      <GoodsItem color="red" icon="favorite" title={likes} />
    </View>
  </ImageBackground>
));

const MyViewPager = ({ data, viewRef, setActiveIndex, showDialog }) => {
  const thumbnailUrl = "http://10.0.2.2:3001/Thumbnails";

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CustomImageBackground
        uri={`${thumbnailUrl}/${item.thumbnailPath}`}
        views={item.views}
        likes={item.likes}
      />
      <TouchableOpacity
        style={styles.overlay}
        onLongPress={() => showDialog(item)}
      />
    </View>
  );

  return (
    <PaperProvider>
      <ViewPager
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
        ref={viewRef}
        initialPage={0}
        style={{ flex: 1, backgroundColor: "gray" }}
      >
        <View key={`works-0`}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={3}
            ListFooterComponent={() => (
              <Text style={styles.footerText}>亲，滑到底了~</Text>
            )}
          />
        </View>

        <View key={`works-1`}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={3}
            ListFooterComponent={() => (
              <Text style={styles.footerText}>亲，滑到底了~</Text>
            )}
          />
        </View>
        <View key={`works-2`}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={3}
            ListFooterComponent={() => (
              <Text style={styles.footerText}>亲，滑到底了~</Text>
            )}
          />
        </View>
      </ViewPager>
    </PaperProvider>
  );
};

const TabBar = ({ activeIndex, setActiveIndex, viewRef, tabToGetData }) => {
  const tabs = ["作品", "动态", "喜欢"];

  const handlePress = (index) => {
    viewRef.current.setPage(index);
    setActiveIndex(index);
    tabToGetData();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {tabs.map((title, index) => (
        <TextButton
          key={index}
          title={title}
          style={[
            styles.viewBtns,
            activeIndex === index ? styles.viewerBtnsActive : "",
          ]}
          onPress={() => handlePress(index)}
        />
      ))}
      <Animated.View
        style={{
          backgroundColor: "#f4cf4c",
          height: 2,
          width: "33.333333%",
          position: "absolute",
          bottom: 0,
          left: `${activeIndex * 33.333333}%`, // Simplified position calculation
        }}
      />
    </View>
  );
};

function GoodsItem({ icon, title, color }) {
  return (
    // <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.GoodsItem}>
      <Icon color={color} name={icon} size={14} />
      <Text
        style={{
          color,
          marginLeft: 5,
        }}
      >
        {title}
      </Text>
    </View>
    // </TouchableWithoutFeedback>
  );
}

// 标签Txt
function Tags({ tagTxt }) {
  return (
    <View
      style={{
        marginRight: 8,
      }}
    >
      <Text style={styles.TagsTxt}>{tagTxt}</Text>
    </View>
  );
}

// 获赞 关注 粉丝
function NumText({ number, text }) {
  return (
    <View
      style={{
        flexDirection: "col",
        marginLeft: 5,
        marginRight: 25,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 25,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {number}
      </Text>
      <Text
        style={{
          color: "#999999",
          fontSize: 15,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default Me;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSpacing: {
    width: 20, // Adjust this value to increase/decrease space between buttons
  },
  itemContainer: {
    flex: 1,
    margin: 0,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: "white",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#161721",
  },
  background: {
    width: "100%",
    height: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "rgba(128,128,128,0.8)", // 半透明的灰色背景
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  textBtn: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#666",
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 3,
    marginTop: 10,
  },
  viewBtns: {
    color: "gray",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    paddingBottom: 10,
  },
  viewerBtnsActive: {
    fontWeight: "bold",
    color: "white",
  },
  GoodsItem: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  TagsTxt: {
    color: "#999999",
    backgroundColor: "#24262f",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    fontSize: 15,
  },
});

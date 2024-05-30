import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconButton from "../../components/button/IconButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Provider as PaperProvider, Dialog, Portal } from "react-native-paper";
import * as FileSystem from "expo-file-system";

// 创建底部导航器
const IndexBottomTabNavigator = createBottomTabNavigator();
// 导入四个页面
import IndexPage from "./index/Index";
import CityPage from "./city/Index";
import MessagePage from "./message/Index";
import MePage from "./me/Index";

const Index = () => {
  const [media, setMedia] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userID, setUserID] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("pickMedia: ", result);

    if (!result.canceled) {
      setMedia(result.assets[0]);
      setVisible(true); // 显示确认对话框
    }
  };

  const uploadMedia = async (userID, title, description) => {
    if (!media) {
      Alert.alert("No media selected", "请选择一个视频文件");
      return;
    }

    let localUri = media.uri;
    let filename = localUri.split("/").pop();

    try {
      // 读取文件并进行Base64编码
      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 创建FormData
      const formData = new FormData();
      formData.append("userID", userID);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("filename", filename);
      formData.append("fileData", base64);

      const response = await fetch("http://10.0.2.2:3001/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseJson = await response.json();

      if (response.status === 500) {
        throw new Error("Server error: 500, " + responseJson.msg);
      }

      console.log("response: ", responseJson);
      Alert.alert("上传成功提醒", "视频文件已经成功上传！");
      setVisible(false); // 关闭对话框
      setMedia(null); // 重置媒体状态
    } catch (error) {
      console.error("Error uploading media:", error);
      Alert.alert("上传失败提醒", "上传视频文件时出现了错误。请重试。");
    } finally {
      setTitle("");
      setDescription("");
    }
  };

  const handleUpload = () => {
    uploadMedia(userID, title, description);
    setVisible(false);
  };

  return (
    <PaperProvider>
      <>
        <IndexBottomTabNavigator.Navigator
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "black",
              },
              null,
            ],
            headerShown: false,
          }}
        >
          <IndexBottomTabNavigator.Screen
            name="Main"
            component={IndexPage}
            options={{
              title: "首页",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <IndexBottomTabNavigator.Screen
            name="City"
            component={CityPage}
            options={{
              title: "城市",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="city" color={color} size={size} />
              ),
            }}
          />
          <IndexBottomTabNavigator.Screen
            name="Upload"
            component={CityPage}
            options={{
              title: "+",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons color={color} size={size} />
              ),
            }}
          />
          <IndexBottomTabNavigator.Screen
            name="Message"
            component={MessagePage}
            options={{
              title: "消息",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="message"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <IndexBottomTabNavigator.Screen
            name="Me"
            component={MePage}
            options={{
              title: "我",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </IndexBottomTabNavigator.Navigator>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 5,
              backgroundColor: "white",
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 5,
              borderLeftWidth: 2,
              borderLeftColor: "#78E5E7",
              borderRightWidth: 2,
              borderRightColor: "#E54667",
            }}
          >
            <IconButton
              name="add"
              onPress={() => {
                console.log("你已经打开了上传页面");
                pickMedia();
              }}
            />
            {media && media.type === "image" && (
              <Image source={{ uri: media.uri }} style={styles.image} />
            )}
          </View>
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>视频上传</Dialog.Title>
            <Dialog.Content>
              <Text>你确定要上传该视频吗？</Text>
              {media && media.type === "image" && (
                <Image source={{ uri: media.uri }} style={styles.image} />
              )}
              {/* You can add a video preview here if needed */}
              {/* Add Title input */}
              <Text>标题</Text>
              <TextInput
                placeholder="标题"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
              {/* Add Description input */}
              <Text>描述</Text>
              <TextInput
                placeholder="描述"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <View style={styles.buttonContainer}>
                <Button onPress={() => setVisible(false)} title="取消" />
                <View style={styles.buttonSpacing} />
                <Button onPress={handleUpload} title="确定" />
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    </PaperProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSpacing: {
    width: 20, // Adjust this value to increase/decrease space between buttons
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

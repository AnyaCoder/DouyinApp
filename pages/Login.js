// pages/Login.js

import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { postData } from "../components/video/utils";
import { UserContext } from "../context/UserContext";

const LoginPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    // 实现登录逻辑
    // console.log("PhoneNumber:", phoneNumber);
    // console.log("Password:", password);
    const url = `http://10.0.2.2:3001/api/users/login`;
    const resp = await postData(url, {
      phoneNumber: phoneNumber,
      password: password,
    });

    if (resp.status !== 500) {
      console.log("Login Successfully!");
      setUser({
        userID: resp.userID,
        username: resp.username,
        phoneNumber: resp.phoneNumber,
      });
      Alert.alert("提示", `欢迎回来，${resp.username}`);
      navigation.navigate("Index");
    } else {
      Alert.alert("错误", "手机号或者密码错误！");
      navigation.navigate("Login");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register"); // 导航到注册页面
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎回到Toktik!</Text>
      <TextInput
        style={styles.input}
        placeholder="手机号"
        placeholderTextColor="#aaa"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="登录" onPress={handleLogin} color="#841584" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="注册" onPress={handleRegister} color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1c1c1c",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default LoginPage;

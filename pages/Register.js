// pages/Register.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { postData } from "../components/video/utils";

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(0);

  const handleRegister = async () => {
    // 检查密码和确认密码是否一致
    if (password !== confirmPassword) {
      Alert.alert("错误", "密码和确认密码不一致！");
      return;
    }

    // 实现注册逻辑
    // console.log("Username:", username);
    // console.log("PhoneNumber:", phoneNumber);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Confirm Password:", confirmPassword);
    // console.log("Gender:", gender);

    const url = `http://10.0.2.2:3001/api/users`;
    const resp = await postData(url, {
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      gender: gender,
    });
    console.log(resp);
    if (resp.status !== 500) {
      Alert.alert("提示", "注册成功！");
      console.log("Register Successfully!");
      setPassword("");
      setConfirmPassword("");
    } else {
      Alert.alert("错误", "注册失败！");
      console.log("Register Failed!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>注册新用户</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="手机号"
        placeholderTextColor="#aaa"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="电子邮件地址"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
      <TextInput
        style={styles.input}
        placeholder="确认密码"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="注册" onPress={handleRegister} color="#841584" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="回到登录页"
          onPress={() => navigation.goBack()}
          color="#841584"
        />
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

export default RegisterPage;

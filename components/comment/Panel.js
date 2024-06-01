import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import IconButton from "../button/IconButton";

const Panel = ({ children, open, onClose, commentsNum, handleSend }) => {
  const [panelHeight] = React.useState(new Animated.Value(0));
  const [inputText, setInputText] = React.useState("");

  const openPanel = React.useCallback(() => {
    Animated.timing(panelHeight, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [panelHeight]);

  useEffect(() => {
    if (open) {
      openPanel();
    }
  }, [openPanel, open]);

  return (
    <Animated.View
      style={[
        styles.panel,
        {
          height: panelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "60%"],
          }),
        },
      ]}
    >
      <View style={styles.panelHeader}>
        <Text style={styles.panelText}>{commentsNum}条评论</Text>
        <IconButton
          name="close"
          color="white"
          size={25}
          onPress={() => {
            Animated.timing(panelHeight, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              onClose();
            });
          }}
        />
      </View>
      <View style={styles.panelContent}>{children}</View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="请说点什么吧"
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            handleSend(inputText);
            setInputText("");
          }}
        >
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

Panel.defaultProps = {
  open: false,
};

export default Panel;

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  panelText: {
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  panelContent: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

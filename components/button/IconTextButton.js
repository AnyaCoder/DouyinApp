import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const IconTextButton = ({ text, onPress, name, size, color }) => {
    return (
        <View style={styles.container}>
            <IconButton name={name} onPress={onPress} color={color} size={size} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

// 设置默认属性值
IconTextButton.defaultProps = {
    color: 'white',
    size: 35,
};

// 定义样式
const styles = StyleSheet.create({
    container: {
        flexDirection: 'col',  // 垂直排列
        alignItems: 'center',  // 垂直居中
        justifyContent: 'center'  // 水平居中
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 10,  // 添加水平内边距以支持文本展开
    }
});

export default IconTextButton;

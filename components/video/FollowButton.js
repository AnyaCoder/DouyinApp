import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FollowButton = ({ style }) => {
    // 初始化状态，false 表示未关注（红色背景），true 表示已关注（灰色背景）
    const [isFollowed, setIsFollowed] = useState(false);

    // 切换关注状态的函数
    const toggleFollow = () => {
        setIsFollowed(!isFollowed); // 切换状态
    };

    return (
        <TouchableOpacity
            onPress={toggleFollow} // 设置按钮的点击事件
            style={[
                styles.button,
                isFollowed ? styles.followed : styles.notFollowed, // 根据状态选择样式
                style // 允许从外部传入额外的样式
            ]}
        >
            <Text style={styles.text}>{isFollowed ? '取消关注' : '关注'}</Text>
        </TouchableOpacity>
    );
};

// 定义按钮的样式
const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center', // 确保文本居中
        minWidth: 80, // 最小宽度，避免因文本长度变化导致按钮大小变化
        position: 'absolute', // 使用绝对定位
        right: 0, // 可以根据需要调整位置
        top: 0,
    },
    notFollowed: {
        backgroundColor: 'red', // 未关注状态的背景色
    },
    followed: {
        backgroundColor: 'grey', // 已关注状态的背景色
    },
    text: {
        color: 'white', // 文字颜色
        fontSize: 12, // 字体大小
    },
});

export default FollowButton;

import React, { useState, useMemo } from 'react'
import { View, Text, TouchableNativeFeedback, Animated } from 'react-native'

import rh from '../../images/heart-r.png';
import wh from '../../images/heart-w.png';

const HeartBtn = ({ number }) => {

    // 当前的心， false：白  true：红色
    const [heart, setHeart] = useState(false)
    // 定义心缩放的值
    const [scale] = useState(new Animated.Value(0))

    // 创建动画
    const ani = useMemo(() =>
        Animated.timing(scale, {
            toValue: 3,
            duration: 300,
            useNativeDriver: true,
        }), [scale])

    return (
        <View style={{ flexDirection: 'column' }}>
            <TouchableNativeFeedback
                onPress={() => {
                    // 启动动画
                    ani.start(() => {
                        // 动画执行完之后初始值重置为 0
                        scale.setValue(0)
                    });
                    // 切换心
                    setHeart(!heart);
                }}
            >
                <Animated.Image
                    source={heart ? rh : wh}
                    style={{
                        transform: [
                            {
                                scale: scale.interpolate({
                                    inputRange: [0, 1, 2, 3],
                                    outputRange: [1, 0.6, 1.4, 1]
                                })
                            }
                        ],
                        left: 3
                    }}
                />

            </TouchableNativeFeedback>
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
            }}>
                {number}
            </Text>
        </View>
    )
}

export default HeartBtn

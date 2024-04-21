import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

const RotateAvatar = ({ uri, size, border, borderColor }) => {

    // 动画的变量
    const [rotate] = useState(new Animated.Value(0))

    // 组件加载时就启动
    useEffect(() => {
        // 定义一个动画函数
        function move() {
            // 创建动画并启动
            Animated.timing(rotate, {
                toValue: 1, // 变化到的目标值
                duration: 4000, // 时间，单位： 毫秒
                useNativeDriver: true, // 是否启用原生驱动
                easing: Easing.linear, // 均速动画
            }).start(() => {
                // 这个回调函数会在每次动画执行完之后调用
                // 将值初始化回 0
                rotate.setValue(0);
                // 再启动动画
                move();
            })
        }
        // 调用函数启动动画
        move();
    }, [rotate])

    return (
        <Animated.Image
            source={{ uri }}
            style={{
                borderColor,
                borderWidth: border,
                borderRadius: size === 'big' ? 50 : 25,
                width: size === 'big' ? 100 : 50,
                height: size === 'big' ? 100 : 50,
                transform: [
                    {
                        rotate: rotate.interpolate({
                            inputRange: [0, 1], // 输入变量的变化范围
                            outputRange: ['0deg', '360deg'],    // 映射的实际输出的值的范围
                        })
                    }
                ]
            }}
        />
    )
}

// 设置默认属性值
RotateAvatar.defaultProps = {
    size: 'sm',
    border: 0,
    borderColor: 'black'
}

export default RotateAvatar

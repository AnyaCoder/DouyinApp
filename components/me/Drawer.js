import React from 'react'
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'
import IconButton from '../button/IconButton'
import Menu from './Menu';

const Drawer = () => {

    // 定义动画数据，控制宽度
    const [width] = React.useState(new Animated.Value(0));

    return (
        <View style={styles.outerContainer}>
            <View style={styles.drawerBtn}>
                <IconButton
                    name="apps"
                    color="white"
                    size={25}
                    onPress={() => {
                        // 创建动画并执行
                        Animated.timing(width, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: false,
                        }).start();
                    }}
                />
            </View>

            <Animated.View
                style={[styles.container, {
                    width: width.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                    }),
                },
                ]}>
                {/* 左侧占位 */}
                <TouchableWithoutFeedback
                    onPress={() => {
                        // 创建动画并执行
                        Animated.timing(width, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: false,
                        }).start();
                    }}
                >
                    <View style={styles.left} />
                </TouchableWithoutFeedback>

                <View style={styles.right}>
                    <Menu />
                </View>

            </Animated.View>

        </View>
    )
}


export default Drawer

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    right: {
        width: '65%',
        height: '100%',
        backgroundColor: '#161722',
        right: 0,
        top: 0,
        position: 'absolute',
    },
    left: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '35%',
        height: '100%',
        // backgroundColor: 'red',
    },
    outerContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    drawerBtn: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'black',
        borderRadius: 18,
        padding: 4,
    },
})

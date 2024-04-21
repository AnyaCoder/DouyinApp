import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';
import IconButton from '../button/IconButton'

const Panel = ({ children, open, onClose }) => {
    // 定义框的高度
    const [panelHeight] = React.useState(new Animated.Value(0))
    // 打开这个面板的方法
    const openPanel = React.useCallback(() => {
        Animated.timing(panelHeight, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [panelHeight])

    // 当 open 属性改变并且改变为 true 时才调用
    React.useEffect(() => {
        if (open) {
            openPanel();
        }
    }, [openPanel, open])

    return (
        <Animated.View style={[styles.panel, {
            height: panelHeight.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '50%'],
            })
        }]}>
            {/* 关闭按钮 */}
            <View style={styles.panelHeader}>
                <Text style={styles.panelText}>1234条</Text>
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
                            // 关闭动画执行完之后 触发组件的 onClose
                            onClose();
                        });
                    }}
                />
            </View>
            {/* 内容 */}
            {children}
        </Animated.View>
    )
}

// open 属性默认是 false （关闭的）
Panel.defaultProps = {
    open: false,
}

export default Panel

const styles = StyleSheet.create({
    panel: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '85%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    panelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    panelText: {
        color: 'white',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center',
    }
})

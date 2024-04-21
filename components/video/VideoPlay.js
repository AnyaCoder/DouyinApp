import React from 'react'
import { StyleSheet, View, Text, StatusBar, FlatList, Animated, } from 'react-native'
import Video from 'react-native-video'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

// 引入组件
import Avatar from '../avatar/Avatar'
import HeartBtn from '../button/HeartBtn'
import IconTextButton from '../button/IconTextButton'
import RotateAvatar from '../avatar/RotateAvatar'

import OpenCommentContext from '../../context/OpenCommentContext'

const VideoPlay = ({ paused }) => {
    const openComment = React.useContext(OpenCommentContext)
    return (
        <View style={{ flex: 1, bottom: 16 }}>
            {/* 顶部状态栏 */}
            <StatusBar
                translucent={true}
                backgroundColor="rgba(0,0,0,0)"
                barStyle="dark-content"
            />
            {/* 视频播放 */}
            <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: ResizeMode.CONTAIN,
                    // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                    source: {
                      //  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        uri: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
                    },
                }}
            />
            {/* 图标按钮 */}
            <View style={styles.btns}>
                <View style={styles.btnItem}>
                    <Avatar uri="http://ww1.sinaimg.cn/large/007WurYGgy1ge8nxttd9nj302s02s0si.jpg" />
                   
                </View>
                <View style={styles.btnItem}>
                    <IconTextButton
                        name="people"
                        text="+关注"
                        onPress={() => {
                            // 关注
                            console.log("你已经成功关注他/她！")
                        }}
                    />
                </View>
                <View style={styles.btnItem}>
                    <HeartBtn number="66.6w" />
                </View>
                <View style={styles.btnItem}>
                    <IconTextButton
                        name="comment"
                        text="15亿"
                        onPress={() => {
                            // 打开评论框
                            openComment(true);
                        }}
                    />
                </View>
                <View style={styles.btnItem}>
                    <IconTextButton name="share" text="4399" />
                </View>
                <View style={styles.btnItem}>
                    <RotateAvatar
                        size="sm"
                        border={10}
                        uri="http://ww1.sinaimg.cn/large/007WurYGgy1ge8nxttd9nj302s02s0si.jpg"
                    />
                </View>
            </View>

        </View>
    )
}

export default VideoPlay

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    btns: {
        position: 'absolute',
        right: 2,
        bottom: 100,
        alignItems: 'center',
    },
    btnItem: {
        marginTop: 20, // 按钮的上下间距
    },
})

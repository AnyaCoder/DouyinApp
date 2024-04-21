import React from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import VideoPlay from './VideoPlay';

// 获取屏幕的高度
const { height } = Dimensions.get('window');

// 模拟一个数据
const data = [1, 2];

const VideoList = () => {

    // 当前视频的下标
    const [current, setCurrent] = React.useState(0)

    return (
        <FlatList
            pagingEnabled={true} // 一次滑动一屏
            data={data}
            onMomentumScrollEnd={(e) => {
                let index = parseInt(e.nativeEvent.contentOffset.y / (height));
                setCurrent(index);
            }}
            renderItem={({ item, index }) => (
                <View style={{ height: height, top: 16}}>
                    <VideoPlay paused={index !== current} />
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default VideoList

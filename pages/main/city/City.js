import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Avatar from '../../../components/avatar/Avatar'

// 当前是否正在加载中
let loading = false;

const City = ({ navigation }) => {

    // 当用户一打开这个页面，就执行获取所在城市并设置标题
    useEffect(() => {
        // 1. 先获取用户所在的城市
        let city = '北京'
        // 2. 把名称设置为标题
        navigation.setOptions({
            title: city,
        })
    }, [navigation])

    // 模拟数据
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // 是否显示刷新的图标
    const [refreshing, setRefreshing] = useState(false)

    return (
        <View>
            <StatusBar barStyle="light-content" />

            <FlatList
                numColumns={2}
                data={data}
                refreshing={refreshing}
                onRefresh={() => {
                    // 显示刷新图标
                    setRefreshing(true);

                    // 调用接口获取最新的数据（模拟一下调用接口）
                    setTimeout(() => {
                        // 更新数据
                        setData([1, 2, 3, 4]);

                        // 更新完之后隐藏刷新隐藏刷新图标
                        setRefreshing(false);
                    }, 2000);
                }}
                renderItem={({ item, index }) => <VideoItem navigation={navigation} />}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <Text
                        style={{
                            height: 50,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                        }}>
                        加载中...
                    </Text>
                }
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    // 如果当前正在加载中，那么就直接退出，不需要再加载
                    if (loading) {
                        return;
                    }

                    // 标记一下，当前正在加载
                    loading = true;

                    // 调用接口获取数据，把数据追回到数据的后面
                    setTimeout(() => {
                        // 调用接口获取数据，把数据追回到数据的后面
                        setData([...data, ...[5, 6, 7, 8]])

                        // 标记为加载完，可以进行下次加载了
                        loading = false;
                    }, 2000);
                }}
            />
        </View>
    )
}

// 每条记录的样式
function VideoItem({ navigation }) {
    return (
        <View style={styles.VideoItem}>
            {/* 背景图 */}
            <TouchableWithoutFeedback
                onPress={() => {
                    // 跳转到详情页
                    navigation.navigate('City-Detail', { id: 13 });
                }} >

                <ImageBackground
                    style={{
                        width: '100%',
                        height: 300,
                    }}
                    source={{
                        uri: 'https://pic1.zhimg.com/v2-b255e6f3e61c68c3a9a6305dcead04ca_r.jpg'
                    }}>
                    <View style={{ position: 'absolute', left: 10, bottom: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="add-location" color="white" size={20} />
                            <Text style={{ color: 'white' }}>1.1km</Text>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', right: 10, bottom: 30 }}>
                        <Avatar uri="https://pic1.zhimg.com/v2-a5e25fcfc84112e1d0987dfd9f0f75cc_r.jpg" />
                    </View>
                </ImageBackground>

            </TouchableWithoutFeedback>

            {/* 标题 */}
            <View style={{ position: 'absolute', left: 10, bottom: 10 }}>
                <Text style={{color: 'white', fontSize: 15}}>原神，启动！星铁，启动！</Text>
            </View>
        </View>
    )
}

export default City

const styles = StyleSheet.create({
    VideoItem: {
        flex: 1,
        borderWidth: 3,
    }
})

import React, { useRef, useState, useEffect, memo } from 'react'
import { StyleSheet, Text, View, Button, ImageBackground, Animated, FlatList, PanResponder, TouchableOpacity } from 'react-native'
import Avatar from '../../../components/avatar/Avatar'
import Drawer from '../../../components/me/Drawer';
import ViewPager from 'react-native-pager-view'
import TextButton from '../../../components/button/TextButton';
import IconButton from '../../../components/button/IconButton'
import Icon from 'react-native-vector-icons/MaterialIcons'

// 引入 context
import OpenDrawerContext from '../../../context/OpenDrawerContext'

// 模拟的数据
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



const Me = () => {

    const openDrawer = React.useContext(OpenDrawerContext)

    // 滑动框的引用
    const viewRef = useRef();

    // 当前被选中的框的下标
    const [activeIndex, setActiveIndex] = useState(0)

    // 定义动画变量
    const [move] = useState(new Animated.Value(0))

    const [movePan, setMovePan] = useState({})


    // 监听当前下标，只要下标改变就执行动画
    useEffect(() => {

        Animated.timing(move, {
            toValue: activeIndex, // 把线
            duration: 100,
            useNativeDriver: false,
        }).start();

        // 左滑显示右侧导航
        let pan = PanResponder.create({
            // 要求成为响应者：
            // 开启手势滑动功能
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,

            // 不需要获取其他点击等事件
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            // 滑动结束时触发
            // gestureState.dx : 结束的坐标 - 开始的坐标 （整数：向右滑动的距离， 负数： 向左滑动的距离）
            // gestureState.dy : 结束的坐标 - 开始的坐标 （整数：向下滑动的距离， 负数： 向上滑动的距离）
            onPanResponderMove: (evt, gestureState) => {
                // console.log(gestureState);
                if (gestureState.dx <= -80) {
                    // 执行动画
                    openDrawer();
                }

            },
        });

        setMovePan(pan);
    }, [activeIndex, move])

    return (
        <View style={{ flex: 1, backgroundColor: '#161721' }}>
            <View {...movePan.panHandlers} >
                {/* 顶部背景图 */}

                <View style={{flex: 1}}>
                    <ImageBackground
                        style={styles.background}
                        source={{uri: 'https://pica.zhimg.com/80/v2-2a04aebe8ea49cead4228f826dec589c_1440w.webp'}}
                    >
                        <TouchableOpacity style={{...styles.button, left:'20%', top: 30}}>
                            <Text style={styles.buttonText}>编辑资料</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.button, left:'160%', top: 30}}>
                            <Text style={styles.buttonText}>新消息2</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                {/* 头像 */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingTop: 100,
                    }}>

                    <View style={{
                        top: -10
                    }}>
                        <Avatar
                            border={5}
                            size="big"
                            uri="https://portrait.gitee.com/uploads/avatars/user/1593/4779677_King-XiYu_1578974235.png!avatar100"
                        />
                    </View>
                    <View
                    style={{
                        paddingTop: 20,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }} >
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>蚌埠居士</Text>
                        <Text style={{ color: 'white', marginTop: 5}}>抖音号：15201090000</Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                    }} >


                    <Text style={{ color: 'white', fontSize: 20 }}>这是什么？我的个性签名啊！</Text>

                    {/* 标签 */}
                    <View style={{
                        marginTop: 8,
                        marginBottom: 8,
                        flexDirection: 'row',
                    }}>
                        <Tags tagTxt="北京" />
                        <Tags tagTxt="海淀" />
                        <Tags tagTxt="+增加性别、学校等标签" />
                    </View>

                    {/* 获赞 关注 粉丝 */}
                    <View style={{
                        marginTop: 2,
                        marginBottom: 18,
                        flexDirection: 'row',
                        justifyContent: 'space-between',  // 使用 space-between 来分散对齐
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <NumText number="11" text="获赞" />
                            <NumText number="45" text="朋友" />
                            <NumText number="14" text="关注" />
                            <NumText number="66" text="粉丝" />
                        </View>
                        <View>
                            <TextButton 
                                style={{
                                    color: 'white',
                                    fontSize: 20,           // 较小的字体大小
                                    fontWeight: 'bold',
                                    top: 5,
                                    right: 25,
                                    paddingVertical: 10,     // 上下内边距
                                    paddingHorizontal: 15,  // 左右内边距
                                    borderRadius: 10,       // 圆角
                                    backgroundColor: '#999999' // 按钮背景颜色
                                }}
                                title='添加朋友'
                                onPress={() => { console.log("添加朋友成功！") }}
                            />
                        </View>
                        
                    </View>

                </View>
            </View>

            {/* 三列切换： 作品、动态、喜欢 */}
            <TabBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} viewRef={viewRef}/>
            
            {/* 作品、动态、喜欢 */}
            <MyViewPager data={data} viewRef={viewRef} setActiveIndex={setActiveIndex}/>
            
            {/* 右侧抽屉 */}
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    right: 20,
                    backgroundColor: 'black',
                    borderRadius: 16,
                    padding: 4,
                }}>
                <IconButton
                    name="apps"
                    color="white"
                    size={25}
                    onPress={() => {
                        openDrawer();
                    }} />
            </View>

        </View>
    )
}

const CustomImageBackground = memo(({ uri }) => (
    <ImageBackground
        style={{
            flex: 1,
            height: 200,
            width: '100%',
        }}
        source={{ uri }}
    >
        <View style={{ position: 'absolute', bottom: 0, left: 10 }}>
            <GoodsItem color="white" icon="airplay" title="61" />
        </View>
    </ImageBackground>
));

const MyViewPager = ({ data, viewRef, setActiveIndex }) => (
    <ViewPager
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
        ref={viewRef}
        initialPage={0}
        style={{ flex: 1, backgroundColor: 'gray' }}
    >
        {['http://ww1.sinaimg.cn/large/007WurYGgy1gf2ur5byi8j304y08y0wi.jpg',
          'https://pic1.zhimg.com/v2-772dc69c8981cf860741163b2953d550_r.jpg',
          'https://pica.zhimg.com/v2-90320159cfbc62458a391da6cb3248d4_r.jpg'].map((uri, index) => (
            <View key={`works-${index}`}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => <CustomImageBackground uri={uri} />}
                    numColumns={3}
                    ListFooterComponent={() => (
                        <Text style={styles.footerText}>亲，滑到底了~</Text>
                    )}
                />
            </View>
        ))}
    </ViewPager>
);


const TabBar = ({activeIndex, setActiveIndex, viewRef}) => {

    const tabs = ['作品', '动态', '喜欢'];

    const handlePress = index => {
        viewRef.current.setPage(index);
        setActiveIndex(index);
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {tabs.map((title, index) => (
                <TextButton
                    key={index}
                    title={title}
                    style={[
                        styles.viewBtns,
                        activeIndex === index ? styles.viewerBtnsActive : '',
                    ]}
                    onPress={() => handlePress(index)}
                />
            ))}
            <Animated.View
                style={{
                    backgroundColor: '#f4cf4c',
                    height: 2,
                    width: '33.333333%',
                    position: 'absolute',
                    bottom: 0,
                    left: `${activeIndex * 33.333333}%`,  // Simplified position calculation
                }}
            />
        </View>
    );
};


function GoodsItem({ icon, title, color }) {
    return (
        // <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.GoodsItem}>
            <Icon color={color} name={icon} size={14} />
            <Text style={{
                color,
                marginLeft: 5,
            }}>
                {title}
            </Text>
        </View>
        // </TouchableWithoutFeedback>
    )
}

// 标签Txt
function Tags({ tagTxt }) {
    return (
        <View style={{
            marginRight: 8
        }}>
            <Text style={styles.TagsTxt}>{tagTxt}</Text>
        </View>
    )
}

// 获赞 关注 粉丝
function NumText({ number, text }) {
    return (
        <View style={{
            flexDirection: 'col',
            marginLeft: 5,
            marginRight: 25,
        }}>
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 25,
                alignContent: 'center',
                justifyContent: 'center'
            }}>{number}</Text>
            <Text style={{
                color: '#999999',
                fontSize: 15,
            }}>{text}</Text>
        </View>
    )
}

export default Me

const styles = StyleSheet.create({
    footerText: {
        fontSize: 16,
        color: 'white',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#161721'
    },
    background: {
        width: '100%',
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'rgba(128,128,128,0.8)', // 半透明的灰色背景
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    textBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#666',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 10,
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 3,
        marginTop: 10,
    },
    viewBtns: {
        color: 'gray',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        paddingBottom: 10,
    },
    viewerBtnsActive: {
        fontWeight: 'bold',
        color: 'white',
    },
    GoodsItem: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    TagsTxt: {
        color: '#999999',
        backgroundColor: '#24262f',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3,
        fontSize: 15
    }
})

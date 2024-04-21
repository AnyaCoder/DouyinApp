import React, { memo } from 'react';
import { StyleSheet, View, Image, FlatList, Text } from 'react-native';
import IconButton from '../../../components/button/IconButton';

const ButtonList = ({ topPosition }) => (
  <View style={[styles.btnList, { top: topPosition }]}>
    <IconButton name="add" color="white" />
    <View style={styles.textBtnList}>
      <IconButton name="camera" color="white" />
    </View>
    <IconButton name="search" color="white" />
  </View>
);

const AvatarItem = memo(({ username, image }) => (
  <View style={styles.avatarFrame}>
    <Image source={{ uri: image }} style={styles.avatar} />
    <Text style={styles.avatarText}>{username}</Text>
  </View>
));

const MessageItem = memo(({ name, avatar, summary }) => (
  <View style={styles.messageItem}>
    <Image source={{ uri: avatar }} style={styles.messageAvatar} />
    <View style={styles.messageContent}>
      <Text style={styles.messageName}>{name}</Text>
      <Text style={styles.messageSummary}>{summary}</Text>
    </View>
  </View>
));

const AvatarList = () => (
  <FlatList
    data={users}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <AvatarItem {...item} />}
    initialNumToRender={5}  // 假设初始加载5个头像
  />
);

const MessageList = () => (
  <FlatList
    data={messages}
    renderItem={({ item }) => <MessageItem {...item} />}
    keyExtractor={item => item.id}
    style={styles.messageList}
    initialNumToRender={10}  // 假设初始加载10条消息
    ListFooterComponent={() => (
      <Text style={styles.footerText}>没有更多的消息了</Text>
    )}
  />
);

const MessagePageShow = () => (
  <View style={styles.container}>
    <View style={styles.buttonListContainer}>
      <ButtonList topPosition={50} />
    </View>
    {/* <ButtonList topPosition={100} /> */}
    <View style={styles.avatarContainer}>
      <AvatarList />
    </View>
    
    <View style={styles.messagesContainer}>
      <MessageList />
    </View>
  </View>
);


export default MessagePageShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161721',
  },
  btnList: {
    paddingHorizontal: 20,
    position: 'absolute',
    flexDirection: 'row',
  },
  textBtnList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonTextWhite: {
    color: 'white',  // 将所有白色文本的样式统一管理
  },
  buttonListContainer: {
    flex: 0.12,  // 使用flex比例来确定容器的大小
  },
  avatarContainer: {
    flex: 0.18,  // 使用flex比例来确定容器的大小
  },
  avatarFrame: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  avatarText: {
    color: 'white',
    top: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  messagesContainer: {
    flex: 0.7,  // 余下的空间分配给消息列表
  },
  messageList: {
    flex: 1
  },
  messageItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  messageAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,  // 确保圆形
  },
  messageContent: {
    marginLeft: 20,
  },
  messageName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  messageSummary: {
    fontSize: 20,
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    color: 'grey',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10
  },
});


const usr_display_uri = 'https://picx.zhimg.com/v2-2e33c2cac99508ecff3db64d626dcbb5_r.jpg?source=1def8aca';
// Dummy data for avatars
const users = [
  { id: 'user-1', username: '克拉拉1号', image: usr_display_uri },
  { id: 'user-2', username: '克拉拉2号', image: usr_display_uri },
  { id: 'user-3', username: '克拉拉3号', image: usr_display_uri },
  { id: 'user-4', username: '克拉拉4号', image: usr_display_uri },
  { id: 'user-5', username: '克拉拉5号', image: usr_display_uri },
  { id: 'user-6', username: '克拉拉6号', image: usr_display_uri },
  { id: 'user-7', username: '克拉拉7号', image: usr_display_uri },
];


const alice_display_uri = 'https://pic1.zhimg.com/80/v2-9f7e74807109643943f6077943e213c3_1440w.webp?source=1def8aca'
const bob_display_uri = 'https://pic3.zhimg.com/80/v2-a123955bdde497700a5fe0621241c712_1440w.webp'
const messages = [
  { id: '1', name: 'Alice', avatar: alice_display_uri, summary: 'Hey, how are you?' },
  { id: '2', name: 'Bob', avatar: bob_display_uri, summary: 'Dont forget our meeting.' },
  { id: '3', name: 'Alice', avatar: alice_display_uri, summary: 'Hey, how are you?' },
  { id: '4', name: 'Bob', avatar: bob_display_uri, summary: 'Dont forget our meeting.' },
  { id: '5', name: 'Alice', avatar: alice_display_uri, summary: 'Hey, how are you?' },
  { id: '6', name: 'Bob', avatar: bob_display_uri, summary: 'Dont forget our meeting.' },
  { id: '7', name: 'Alice', avatar: alice_display_uri, summary: 'Hey, how are you?' },
  { id: '8', name: 'Bob', avatar: bob_display_uri, summary: 'Dont forget our meeting.' },
  // ... more messages
];

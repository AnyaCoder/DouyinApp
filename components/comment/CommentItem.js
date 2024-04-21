import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from '../avatar/Avatar'
import HeartBtn from '../button/HeartBtn'

const CommentItem = () => {
    return (
        <View style={styles.commentItem}>
            {/* 头像 */}
            <Avatar uri="https://dss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/netdisk.1.3736c73e.iE-nqUKn1Z00_L7Fx2v8uQ.jpg" />
            {/* 评论的内容 */}
            {/* 评论的内容 */}
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>周先生</Text>
                <Text style={{ color: 'white' }}>
                    阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴
                </Text>
            </View>
            {/* 心 */}
            <HeartBtn number="66.6w" />
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
})

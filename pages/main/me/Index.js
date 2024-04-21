import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

// 引入页面
import MePage from './Me'
import OrderPage from './Order'
import ProfilePage from './Profile'

// 创建 Start 导航组件
const MeNavigator = createStackNavigator();


const Index = () => {
    return (
        <MeNavigator.Navigator>
            <MeNavigator.Screen
                name="Me-Me"
                component={MePage}
                options={{
                    title: '',
                    headerTransparent: true, // 设置标题栏为透明
                }} />
            <MeNavigator.Screen
                name="Me-Order"
                component={OrderPage}
                options={{
                    title: '我的订单'
                }} />
            <MeNavigator.Screen
                name="Me-Profile"
                component={ProfilePage}
                options={{
                    title: '编辑资料'
                }} />
        </MeNavigator.Navigator>
    )
}

export default Index

const styles = StyleSheet.create({})

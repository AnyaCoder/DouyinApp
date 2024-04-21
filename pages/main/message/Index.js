import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MessagePageShow from './Message';

// 创建 Start 导航组件
const MsgNavigator = createStackNavigator();

const Index = () => {

    
    return (
        <MsgNavigator.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'flex'
                }
            }}
        > 

            <MsgNavigator.Screen
                name="MessagePage" 
                component={MessagePageShow}
            />
            

        </MsgNavigator.Navigator>
    )
}

export default Index

const styles = StyleSheet.create({})

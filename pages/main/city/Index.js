import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
// 引入栈导航器
import { createStackNavigator } from '@react-navigation/stack';
// 引入页面
import CityPage from './City'
import DetailPage from './Detail'

// 创建导航器
const CityNavigator = createStackNavigator();

const Index = () => {
    return (
        <CityNavigator.Navigator>
            <CityNavigator.Screen
                name="City-City"
                component={CityPage}
                options={{
                    headerStyle: {
                        backgroundColor: '#161824',
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            />
            <CityNavigator.Screen
                name="City-Detail"
                component={DetailPage}
                options={{
                    title: '',
                    headerTransparent: true, // 设置标题栏为透明
                    headerBackImage: () => <Icon name="chevron-left" color="white" size={40} />,
                    headerRight: () => <Icon name="search" color="white" size={0} />
                }}
            />
        </CityNavigator.Navigator>
    )
}

export default Index

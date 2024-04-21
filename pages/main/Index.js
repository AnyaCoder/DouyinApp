import React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconButton from '../../components/button/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePicker from 'react-native-image-crop-picker'; 不可用
// 创建底部导航器
const IndexBottomTabNavigator = createBottomTabNavigator();
// 导入四个页面
import IndexPage from './index/Index';
import CityPage from './city/Index';
import MessagePage from './message/Index';
import MePage from './me/Index';

const Index = () => {
  return (
    <>
      <IndexBottomTabNavigator.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold"
          },
          tabBarStyle: [
            {
              display: "flex",
              backgroundColor: "black"
            },
            null
          ],
          headerShown: false
        }}
      >
        <IndexBottomTabNavigator.Screen 
          name="Main" 
          component={IndexPage}
          options={{ 
            title: '首页',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <IndexBottomTabNavigator.Screen 
          name="City" 
          component={CityPage} 
          options={{ 
            title: '城市',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="city" color={color} size={size} />
            ), 
          }}
        />
        <IndexBottomTabNavigator.Screen
          name="Upload"
          component={CityPage}
          options={{ 
            title: '+',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons color={color} size={size} />
            ), 
          }}
        />
        <IndexBottomTabNavigator.Screen 
          name="Message" 
          component={MessagePage} 
          options={{ 
            title: '消息',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={size} />
            ), 
          }}
        />
        <IndexBottomTabNavigator.Screen 
          name="Me" 
          component={MePage} 
          options={{ 
            title: '我',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ), 
          }}
        />
      </IndexBottomTabNavigator.Navigator>

      <View style={{
        alignItems: 'center'
      }}>
        <View style={{
          position: 'absolute',
          bottom: 5,
          backgroundColor: 'white',
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 5,
          borderLeftWidth: 2,
          borderLeftColor: '#78E5E7',
          borderRightWidth: 2,
          borderRightColor: '#E54667',
        }}>
          <IconButton name="add" onPress={() => {
            console.log("你已经打开了摄像头")
            // ImagePicker.openCamera({
            //   mediaType: 'video',
            // })
            //   .then((img) => {
            //     console.log(img);
            //   })
            //   .catch((v) => {
            //     console.log(v);
            //   })
          }} />
        </View>
      </View>
    </>
  )
}

export default Index;
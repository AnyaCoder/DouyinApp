import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// 引入页面
import Video from './Video'
import Room from './Room'
import Search from './Search'

const IndexStackNavigator = createStackNavigator();

const Index = () => {
    return (
        <IndexStackNavigator.Navigator>
            <IndexStackNavigator.Screen 
            name="Video" 
            component={Video}
            options={{
                headerShown: false,
            }}
             />
            <IndexStackNavigator.Screen name="Room" component={Room} />
            <IndexStackNavigator.Screen name="Search" component={Search} />
        </IndexStackNavigator.Navigator>
    )
}

export default Index

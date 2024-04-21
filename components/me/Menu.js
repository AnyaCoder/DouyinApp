import React, { useState } from 'react'
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


let isOpen = false;

const Menu = () => {
  // 控制动画的变量
  const [move, setMove] = useState(new Animated.Value(0))
  
  return (
    <View style={styles.container}>
      <MenuItem icon="account-balance" title="个人中心" />
    </View>
  )
}

// 左侧导航组件
function MenuItem({ icon, title, onPress }) {
  return (
      <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.MenuItem}>
              <Icon color="white" name={icon} size={22} />
              <Text style={{
                  color: 'white',
                  fontSize: 18,
                  marginLeft: 8,
              }}>
                  {title}
              </Text>
          </View>
      </TouchableWithoutFeedback>
  )
}


export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },  
  MenuItem: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  }
})

import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Image } from 'react-native';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      // replace: 销毁当前页, 跳转到下个页面
      navigation.replace('Index');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.splash}>
      <StatusBar hidden={true} />
      <Image source={require('../images/splash.png')} />
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C0E1B',
  },
});
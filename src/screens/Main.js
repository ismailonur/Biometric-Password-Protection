import React, { Component } from 'react'
import { Text, View, BackHandler, Alert } from 'react-native'

export default class Main extends Component {

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
      }
      
      handleBackButton = () => {
       Alert.alert(
           'Uygulamadan Çık',
           'Uygulamadan çıkılsın mı?', [{
               text: 'Hayır',
               onPress: () => console.log('Hayır Basıldı!'),
               style: 'cancel'
           }, {
               text: 'Evet',
               onPress: () => BackHandler.exitApp()
           }, ], {
               cancelable: false
           }
        )
        return true;
      } 
      
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    render() {
        return (
            <View>
                <Text> Main </Text>
            </View>
        )
    }
}

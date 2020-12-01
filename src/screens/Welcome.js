import React, { Component } from 'react'
import { Button, Text, View, Image, StyleSheet, Alert } from 'react-native'
import Signup from '../screens/Signup'
import Login from '../screens/Login'

export default class Welcome extends Component {

        

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Welcome </Text>
                <Image style={styles.image}
                    source={require('../images/1.webp')} />
                <View>
                    <Button
                        title="Kayıt Ol"
                        color="#aa0000"
                        onPress={() => this.props.navigation.navigate("Login")}
                    />

                    <Button
                        title="Giriş Yap"
                        color="#aa0000"
                        onPress={() => this.props.navigation.navigate("Signup")}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 35
    },

    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'center'
    }
})

import React, { Component } from 'react'
import { View, Image, StyleSheet, Alert } from 'react-native'
import { Container, Header, Content, Button, Text, } from 'native-base';

export default class Welcome extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Biyometrik Doğrulamalı Şifre Koruma </Text>
                <Image style={styles.image}
                    source={require('../images/01.gif')} />
                <View>
                    <Button bordered rounded block danger style={styles.button}
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.buttontext}>GİRİŞ YAP</Text>
                    </Button>

                    <Button bordered rounded block danger style={styles.button}
                        onPress={() => this.props.navigation.navigate("Signup")}>
                        <Text style={styles.buttontext}>KAYIT OL</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: '#8c8c8c',
        textShadowRadius: 20,
    },

    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain'
    },

    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 100,
        borderBottomWidth: 3
    },

    buttontext: {
        fontWeight: "bold",
        fontSize: 15
    }
})

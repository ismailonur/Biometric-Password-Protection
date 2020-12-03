import React, { Component } from 'react'
import { View, Image, StyleSheet, Alert } from 'react-native'
import { Container, Header, Content, Button, Text, } from 'native-base';

export default class Welcome extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Welcome </Text>
                <Image style={styles.image}
                    source={require('../images/1.webp')} />
                <View>
                    <Button bordered rounded block danger style={styles.button}
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text>GİRİŞ YAP</Text>
                    </Button>

                    <Button bordered rounded block danger style={styles.button}
                        onPress={() => this.props.navigation.navigate("Signup")}>
                        <Text>Kayıt Ol</Text>
                    </Button>
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
    },

    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 100
    }
})

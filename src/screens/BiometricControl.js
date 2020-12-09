import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

export default class BiometricControl extends Component {
    render() {
        ReactNativeBiometrics.createKeys('Confirm fingerprint')
            .then((resultObject) => {
                const { publicKey } = resultObject
            })

        ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        })
            .then((resultObject) => {
                const { success, signature } = resultObject

                if (success) {
                    this.props.navigation.navigate("Main")
                }
                else{
                    alert("Giriş Sağlanamadı!")
                }
            })
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Biyometrik Kontrol Sağlanıyor!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingVertical: 130
    },

    text:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    }

});

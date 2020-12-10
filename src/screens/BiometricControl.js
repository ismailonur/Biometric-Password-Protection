import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { Toast } from 'native-base';

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

export default class BiometricControl extends Component {
    render() {
        ReactNativeBiometrics.createKeys('Confirm fingerprint')
            .then((resultObject) => {
                const { publicKey } = resultObject
            })

        ReactNativeBiometrics.createSignature({
            promptMessage: 'Giriş Yap!',
            payload: payload
        })
            .then((resultObject) => {
                const { success, signature } = resultObject

                if (success) {
                    this.props.navigation.navigate("Main")
                }
                else {
                    Toast.show({
                        text: "Giriş Sağlanamadı!",
                        buttonText: "Tamam",
                        type: "danger"
                    })
                }
            })
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Biyometrik Kontrol Sağlanıyor!</Text>
                <Image style={styles.image}
                    source={require('../images/01.gif')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#141414',
    },

    text: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },

    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain'
    },
    
});

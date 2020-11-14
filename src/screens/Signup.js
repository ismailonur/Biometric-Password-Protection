import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

export default class Signup extends Component {
    render() {
        ReactNativeBiometrics.createKeys('Confirm fingerprint')
            .then((resultObject) => {
                const { publicKey } = resultObject
                alert(publicKey)
                sendPublicKeyToServer(publicKey)
            })

        ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        })
            .then((resultObject) => {
                const { success, signature } = resultObject

                if (success) {
                    alert(signature)
                    verifySignatureWithServer(signature, payload)
                }
                else{
                    alert("Olmadııııı")
                }
            })
        return (
            <View>
                <Text>Kayıt Ol</Text>
            </View>
        )
    }
}

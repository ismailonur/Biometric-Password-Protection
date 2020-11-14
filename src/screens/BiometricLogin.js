import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'

//const { biometryType } = ReactNativeBiometrics.isSensorAvailable()

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

export default class BiometricLogin extends Component {
  render() {

    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          alert('TouchID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          alert('FaceID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
          alert('Biometrics is supported')
        } else {
          alert('Biometrics not supported')
        }
      })

    ReactNativeBiometrics.biometricKeysExist()
      .then((resultObject) => {
        const { keysExist } = resultObject

        if (keysExist) {
          alert('Keys exist')
        } else {
          alert('Keys do not exist or were deleted')
        }
      })


      ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          alert('successful biometrics provided')
        } else {
          alert('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        alert('biometrics failed')
      })

    return (
      <View>
        <Text> textInComponent yfyugökjkjgçkjug </Text>
      </View>
    )

    
  }
}

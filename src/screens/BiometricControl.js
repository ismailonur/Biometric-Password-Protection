import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Modal, TouchableOpacity, Button, TextInput } from 'react-native'

import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics();

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
let kasaPass = ''

export default class BiometricControl extends Component {
    state = {
        modalVisible: false,
        number: '',
        biometryType: ''
    }

    componentDidMount = async () => {
        const { biometryType } = await rnBiometrics.isSensorAvailable();
        this.setState({ biometryType })
        this.biometricControl();
    }

    biometricControl = async () => {
        const { biometryType } = this.state;
        if (biometryType === BiometryTypes.Biometrics) {
            await rnBiometrics.createKeys('Confirm fingerprint')

            const { success, signature } = await rnBiometrics.createSignature({
                promptMessage: 'Giriş Yap!',
                payload: payload
            })

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
        }
        if (biometryType !== BiometryTypes.Biometrics) {
            this.setState({ modalVisible: true })
        }
    }

    okeyButton = async () => {
        kasaPass = await AsyncStorage.getItem('my_secret_key');
        console.log(kasaPass)
        if (this.state.number === kasaPass) {
            this.setState({ modalVisible: false })
            this.props.navigation.navigate("Main")
        }
        if (this.state.number !== kasaPass) {
            Toast.show({
                text: "Şifre Hatalı!",
                buttonText: "Tamam",
                type: "danger"
            })
        }
    }

    modal() {
        const { modalVisible, number } = this.state;
        return (
            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    this.setState({ modalVisible: false });
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => this.setState({ modalVisible: false })} activeOpacity={1}>
                    <View style={styles.modalView}>
                        <Text>
                            Lütfen Kasa Şifrenizi Giriniz!
                        </Text>
                        <View style={styles.parentHr} />
                        <TextInput
                            style={styles.input}
                            onChangeText={(t) => this.setState({ number: t })}
                            value={number}
                            placeholder="Şifre"
                            keyboardType="numeric"
                        />
                        <Button
                            title="Tamam"
                            onPress={this.okeyButton}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.modal()}
                <Text style={styles.text}>Biyometrik Kontrol Sağlanıyor!</Text>
                <Image style={styles.image}
                    source={require('../images/01.gif')} />
                <TouchableOpacity onPress={this.biometricControl} style={styles.loginButton}>
                    <Text style={styles.textButton}>Giriş Yap</Text>
                </TouchableOpacity>
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

    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },

    loginButton: {
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        marginTop: '15%',
        marginHorizontal: '30%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    // Modal Styles START
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0, 0.2)',
    },

    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    parentHr: {
        backgroundColor: '#EFEFEF',
        alignSelf: 'center',
        width: '90%',
        height: 1,
    },
    // Modal Styles END
});

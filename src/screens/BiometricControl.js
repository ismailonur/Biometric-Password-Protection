import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Modal, TouchableOpacity, Button, TextInput } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
let biometryType = 'undefined'
let kasaPass = ''

export default class BiometricControl extends Component {
    state = {
        modalVisible: true,
        number: ''
    }

    async componentDidMount() {
        biometryType = await ReactNativeBiometrics.isSensorAvailable();
    }

    okeyButton = async () => {
        kasaPass = await AsyncStorage.getItem('my_secret_key');
        if(this.state.number === kasaPass){
            this.setState({ modalVisible: false })
            this.props.navigation.navigate("Main")
        }
        if(this.state.number !== kasaPass){
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
                            onChangeText={(t) => this.setState({number: t})}
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
        if (biometryType === ReactNativeBiometrics.Biometrics) {
            ReactNativeBiometrics.createKeys('Confirm fingerprint')
                .then((resultObject) => {
                    const { publicKey } = resultObject
                }).catch((error) => {
                    console.log(error)
                });

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
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            return (
                <View style={styles.container}>
                    {this.modal()}
                </View>
            )
        }
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

    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
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

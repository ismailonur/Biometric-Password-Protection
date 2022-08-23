import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Signup extends Component {
    state = {
        email: "",
        password: "",
        againPassword: "",
        phoneNumber: "",
        code: "",
        confirm: null
    }

    GoSignup() {
        const { email, password, againPassword } = this.state

        if (password === againPassword) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    Toast.show({
                        text: "Kullanıcı Oluşturuldu & Giriş Yapılıyor!",
                        buttonText: "Tamam",
                        type: "success"
                    })
                    this.storeData(this.state.kasaPassword)
                    this.props.navigation.navigate("Main")
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Toast.show({
                            text: "Girilen Email Sistemde Kayıtlı!",
                            buttonText: "Tamam",
                            type: "warning"
                        })
                    }

                    if (error.code === 'auth/invalid-email') {
                        Toast.show({
                            text: "Bu Email Geçersiz!",
                            buttonText: "Tamam",
                            type: "warning"
                        })
                    }
                });
        }
        else {
            Toast.show({
                text: "Girilen Şifreler Uyuşmuyor!",
                buttonText: "Tamam",
                type: "warning"
            })
        }
    }

    async storeData(value) {
        await AsyncStorage.setItem('my_secret_key', value)
    }

    render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Hesap Şifresi</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Hesap Şifresi Tekrar</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ againPassword: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Kasa Şifresi</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ kasaPassword: text })} />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.signupButton}
                        onPress={() => this.GoSignup()}>
                        <Text style={styles.kayitOlText}>KAYIT OL</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingVertical: 100,
        width: '90%',
        alignSelf: 'center',
    },

    signupButton: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
        marginHorizontal: 80
    },

    textInputText: {
        color: '#fff'
    },

    kayitOlText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
})
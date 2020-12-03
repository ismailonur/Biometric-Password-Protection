import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import auth from '@react-native-firebase/auth';

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

export default class Signup extends Component {

    state = {
        email: "",
        password: "",
        againPassword: "",
        phoneNumber: "",
    }

    GoSignup() {
        const { email, password, againPassword } = this.state

        if (password === againPassword) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    alert('User account created & signed in!');
                    this.props.navigation.navigate("Main")
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        alert('That email address is invalid!');
                    }

                    alert(error);
                });
        }
        else {
            alert("Şifreler Uyuşmuyor!");
        }

    }

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
                else {
                    alert("Olmadııııı")
                }
            })
        return (
            <Container >
                <Content style={styles.container}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Phone Number</Label>
                            <Input onChangeText={(text) => this.setState({ phoneNumber: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Again Password</Label>
                            <Input onChangeText={(text) => this.setState({ againPassword: text })} />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.signupButton}
                        onPress={() => this.GoSignup()}>
                        <Text>Kayıt Ol</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: 100
    },

    signupButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
        marginHorizontal: 50
    }
})
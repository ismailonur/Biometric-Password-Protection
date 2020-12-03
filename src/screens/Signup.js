import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';

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
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Again Password</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.signupButton}>
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
        paddingVertical: 130
    },

    signupButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 100,
        marginHorizontal: 50
    }
})
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Root, Container, Content, Form, Item, Input, Label, Button, Text, Toast, Icon } from 'native-base';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class AddPass extends Component {

    AddFirebase() {
        alert('firebase')
        const { name, password, secondPassword } = this.state
        if (password !== secondPassword) {
            alert('Şifreler Uyuşmuyor!')
        }
        else {
            database().ref(`PASS/${auth().currentUser.uid}/${name}`).set({
                name: name,
                subtitle: password
            })
            this.LoadingPassword();
        }
    }

    async LoadingPassword() {
        const data = await database().ref(`PASS/${auth().currentUser.uid}`).once('value')
        const snapshot = Object.values(data.val())
        this.setState({ allPassword: snapshot, firebaseControl: true })
    }

    render() {
        return (
            <Container >
                <Content style={styles.container}>
                    <Form>
                        <Item floatingLabel>
                            <Label>İsim</Label>
                            <Input
                                //textAlign='center'
                                autoCompleteType='email'
                                keyboardType='email-address'
                                textContentType='emailAddress' onChangeText={(text) => this.setState({ name: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Şifre</Label>
                            <Input
                                //textAlign='center'
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Şifre Tekrar</Label>
                            <Input
                                //textAlign='center'
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ secondPassword: text })} />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.loginButton}
                        onPress={() => this.AddFirebase()}>
                        <Text>ŞİFRE'Yİ KAYDET</Text>
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
        paddingVertical: 130
    },

    createPassword: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingVertical: 130,
        paddingHorizontal: 80

    },

    loginButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 100,
        marginHorizontal: 10
    },

    newPassText: {
        color: '#fff',
        textAlign: 'center',
    }
})
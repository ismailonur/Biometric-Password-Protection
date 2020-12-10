import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import auth from '@react-native-firebase/auth';

export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    GoLogin() {
        const { email, password } = this.state;
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                Toast.show({
                    text: "Giriş Yapıldı!",
                    buttonText: "Tamam",
                    type: "success"
                })
                this.props.navigation.navigate("Main")
            })
            .catch((error) => {
                Toast.show({
                    text: "Email veya Şifre Hatalı!",
                    buttonText: "Tamam",
                    type: "danger"
                })
            })
    }

    render() {
        return (
            <Container >
                <Content style={styles.container}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                textContentType='emailAddress' onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Şifre</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='password'
                                keyboardType='visible-password'
                                textContentType='password'
                                onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.loginButton}
                        onPress={() => this.GoLogin()}>
                        <Text style={styles.girisYapText}>GİRİŞ YAP</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingVertical: 130
    },

    loginButton: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 100,
        marginHorizontal: 80
    },

    textInputText: {
        color: '#fff'
    },

    girisYapText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})
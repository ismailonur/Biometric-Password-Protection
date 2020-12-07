import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {

    state = {
        email: "",
        password: "",
        againPassword: "",
        phoneNumber: "",
        code: "",
        confirm: null
    }

    async CodeConfirm(){
        alert(auth().currentUser.email)
        const {verificationId, code} = this.state
        try {
            alert(auth().currentUser.email)
            const credential = auth.PhoneAuthProvider.credential(
              verificationId,
              code,
            );
            let userData = await auth().currentUser.linkWithCredential(credential);
            alert(userData.user);
          } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
              alert('Invalid code.');
            } else {
              //alert('Account linking error');
              alert(error)
            }
          }
    }

    async GoPhone(){
        const confirmation = await auth().verifyPhoneNumber('+90 543-386-9448');
        console.log(confirmation);
        this.setState({confirm: confirmation.verificationId})
    }

    GoSignup() {
        const { email, password, againPassword } = this.state

        if (password === againPassword) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    alert('Kullanıcı Oluşturuldu & Giriş Yapılıyor!');
                    this.props.navigation.navigate("Main")
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('Girilen e-posta adresi sistemde kayıtlı!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        alert('Bu e-posta adresi geçersiz!');
                    }

                    alert(error);
                });
        }
        else {
            alert("Girilen şifreler Uyuşmuyor!");
        }
    }

    render() {
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
                        <Item floatingLabel>
                            <Label>Code</Label>
                            <Input onChangeText={(text) => this.setState({ code: text })} />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.signupButton}
                        onPress={() => this.GoSignup()}>
                        <Text>Kayıt Ol</Text>
                    </Button>
                    <Button light block rounded style={styles.signupButton}
                        onPress={() => this.CodeConfirm()}>
                        <Text>Code Confirm</Text>
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
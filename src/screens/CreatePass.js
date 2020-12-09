import React, { Component } from 'react'
import { View, BackHandler, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Root, Container, Content, Form, Item, Input, Label, Button, Text, Toast, Icon } from 'native-base';

export default class CreatePass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false
        };
    }

    state = {
        name: "",
        password: "",
        secondPassword: "",
        charLength: 8,
        text: '',
        randomPassword: '',
        allPassword: [],
        firebaseControl: false,
        retVal: ""
    }

    generatePassword() {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retValFor = ""
        for (var i = 0, n = charset.length; i < this.state.charLength; ++i) {
            retValFor += charset.charAt(Math.floor(Math.random() * n));
        }
        this.setState({ retVal: retValFor })
    }

    render() {
        return (
            <Root>
                <Container >
                    <Content padder style={styles.createPassword}>
                        <Form>
                            <Item rounded >
                                <Input
                                rem
                                editable={this.state.editable}
                                    placeholder='Şifre Karakter Uzunluğu'
                                    maxLength={2}
                                    textAlign='center'
                                    keyboardType='number-pad'
                                    //value={this.state.charLength}
                                    onChangeText={text => this.setState({ charLength: text })}
                                />
                            </Item>
                        </Form>

                        <Button style={styles.loginButton}
                            onPress={() => this.generatePassword()
                            }
                        >
                            <Text>ŞİFRE OLUŞTUR</Text>
                        </Button>

                        <Text style={styles.newPassText}> {this.state.retVal} </Text>

                        <Button iconLeft
                            onPress={() =>
                                Toast.show({
                                    text: "Şifre Kopyalandı!",
                                    buttonText: "Tamam",
                                    duration: 3000
                                })} >
                            <Icon name='copy' />
                            <Text>Kopyala</Text>
                        </Button>
                    </Content>
                </Container>
            </Root >
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
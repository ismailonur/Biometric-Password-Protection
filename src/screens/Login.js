import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';

export default class Login extends Component {
    render() {
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
                    </Form>
                    <Button light block rounded style={styles.loginButton}>
                        <Text>Giriş Yap</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: 130
    },

    loginButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 100,
        marginHorizontal: 50
    }
})
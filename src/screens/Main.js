import * as React from 'react';
import { View, BackHandler, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import database from '@react-native-firebase/database';

const Tab = createBottomTabNavigator();

const list = [
    {
        name: 'Instagram',
        subtitle: '***************'
    },
    {
        name: 'Facebook',
        subtitle: '***************'
    },
    {
        name: 'Email',
        subtitle: '***************'
    },
    {
        name: 'Github',
        subtitle: '***************'
    },
    {
        name: 'Linkedin',
        subtitle: '***************'
    },
    {
        name: 'TWAS',
        subtitle: '***************'
    },
    {
        name: 'Reddit',
        subtitle: '***************'
    },
    {
        name: 'Medium',
        subtitle: '***************'
    },
    {
        name: 'WordPress',
        subtitle: '***************'
    },
    {
        name: 'Pinterest',
        subtitle: '***************'
    },
    {
        name: 'Twitter',
        subtitle: '***************'
    },
]

export default class Main extends React.Component {

    state = {
        name: "",
        password: "",
        secondPassword: "",
        charLength: "",
        text:''
    }

        // From the RN documentation
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props && nextState !== this.state;
    }

    generatePassword() {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%^&*_+|?><,.-=",
            retVal = "";
        for (var i = 0, n = charset.length; i < this.state.charLength; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        alert(retVal);
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => alert(item.name)} >
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        )
    }

    Passwords() {
        return (
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={list}
                renderItem={this.renderItem}
            />
        );
    }


    AddFirebase(){
        alert('firebase')
    }

    AddPassword() {
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
        );
    }


    CreatePassword() {
        return (
            <Container >
                <Content style={styles.createPassword}>
                    <Form>
                        <Item rounded>
                            <Input
                                placeholder='Şifre Karakter Uzunluğu'
                                maxLength={2}
                                textAlign='center'
                                keyboardType='number-pad'
                                //value={this.state.charLength}
                                onChangeText={text => this.setState({charLength: text})}
                                 />
                        </Item>
                    </Form>
                    <Button light block rounded style={styles.loginButton}
                        onPress={() => alert("Şifre Kayıt Edildi")}>
                        <Text>ŞİFRE OLUŞTUR</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }

    handleBackButton = () => {
        Alert.alert(
            'Uygulamadan Çık',
            'Uygulamadan çıkılsın mı?', [{
                text: 'Hayır',
                onPress: () => console.log('Hayır Basıldı!'),
                style: 'cancel'
            }, {
                text: 'Evet',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Şifreler') {
                            iconName = focused
                                ? 'server-outline'
                                : 'server-outline';
                        } else if (route.name === 'Şifre Oluştur') {
                            iconName = focused ? 'key-outline' : 'key-outline';
                        } else if (route.name === 'Şifre Ekle') {
                            iconName = focused ? 'finger-print-outline' : 'finger-print-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'red',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Şifreler" component={this.Passwords.bind(this)} />
                <Tab.Screen name="Şifre Ekle" component={this.AddPassword.bind(this)} />
                <Tab.Screen name="Şifre Oluştur" component={this.CreatePassword.bind(this)} />
            </Tab.Navigator>
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
        marginHorizontal: 50
    }
})
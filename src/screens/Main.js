
import * as React from 'react';
import { View, BackHandler, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';
import { Root, Container, Content, Form, Item, Input, Label, Button, Text, Toast, Icon } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { writeToClipboard } from './Utilities';
import Clipboard from '@react-native-community/clipboard';

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
        text: '',
        allPassword: [],
        firebaseControl: false,
        showToast: false,
        retVal: ""
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.LoadingPassword();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

    // From the RN documentation
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.allPassword !== this.state.allPassword) {
            return true
        }
        if (nextState.retVal !== this.state.retVal) {
            return true
        }
        return nextProps !== this.props && nextState !== this.state;
    }

    async LoadingPassword() {
        const data = await database().ref(`PASS/${auth().currentUser.uid}`).once('value')
        const snapshot = Object.values(data.val())
        this.setState({ allPassword: snapshot, firebaseControl: true })
    }

    generatePassword() {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!^&*_+|?><,-=",
            retValFor = "";
        for (var i = 0, n = charset.length; i < this.state.charLength; ++i) {
            retValFor += charset.charAt(Math.floor(Math.random() * n));
        }
        this.setState({ retVal: retValFor })
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
        if (this.state.firebaseControl === true) {
            return (
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.allPassword}
                    renderItem={this.renderItem}
                />
            );
        } else {
            return <Text>Yükleniyor...</Text>
        }
    }

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
            <Root>
                <Container >
                    <Content padder style={styles.createPassword}>
                        <Form>
                            <Item rounded>
                                <Input
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
                            onPress={() => this.generatePassword()}>
                            <Text>ŞİFRE OLUŞTUR</Text>
                        </Button>

                        <Text style={styles.newPassText}>{this.state.retVal}</Text>

                        <Button iconLeft
                            style={styles.copyButton}
                            onPress={() => {
                                Clipboard.setString(this.state.retVal);
                                Toast.show({
                                    text: "Şifre Kopyalandı!",
                                    buttonText: "Tamam",
                                    type: "success"
                                })
                            }
                            }
                        >
                            <Icon name='copy' />
                            <Text>Kopyala</Text>
                        </Button>

                    </Content>
                </Container>
            </Root>
        );
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
        paddingVertical: 150,
        paddingHorizontal: 80

    },

    loginButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
        marginHorizontal: 30
    },

    copyButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 30
    },

    newPassText: {
        color: '#fff',
        textAlign: 'center'
    }
})
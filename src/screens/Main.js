import React, { Component } from 'react';
import { View, BackHandler, Alert, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableHighlight, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, Icon, Spinner } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-community/clipboard';
import ReactNativeBiometrics from 'react-native-biometrics'
import { AES_KEY } from '../Ops/key';
import AsyncStorage from '@react-native-async-storage/async-storage';

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
let biometryType = 'undefined'
let my_secret_key = ''

const Tab = createBottomTabNavigator();

class Main extends Component {

    state = {
        name: "",
        password: "",
        charLength: "",
        text: '',
        allPassword: [],
        firebaseControl: false,
        retVal: "",
        modalVisible: false,
        bioName: '',
        bioPassword: '',
        bioModalVisible: false,
        loadingControl: false,
        showToast: false
    }

    async componentDidMount() {
        this.LoadingPassword();

        biometryType = await ReactNativeBiometrics.isSensorAvailable();
        my_secret_key = await AsyncStorage.getItem('my_secret_key');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.allPassword !== this.state.allPassword) {
            return true
        }
        if (nextState.retVal !== this.state.retVal) {
            return true
        }
        if (nextState.modalVisible !== this.state.modalVisible) {
            return true
        }
        if (nextState.bioModalVisible !== this.state.bioModalVisible) {
            return true
        }
        return nextProps !== this.props && nextState !== this.state;
    }

    setModalVisible = (visible, name, password) => {
        this.setState({ modalVisible: visible, bioName: name, bioPassword: password });
    }

    async LoadingPassword() {
        this.setState({ loadingControl: false })
        try {
            const data = await database().ref(`PASS/${auth().currentUser.uid}`).once('value')
            const snapshot = Object.values(data.val())
            this.setState({ allPassword: snapshot, firebaseControl: true })
        } catch (error) {
            this.setState({ allPassword: 'error', firebaseControl: false })
        } finally {
            this.setState({ loadingControl: true })
        }
    }

    generatePassword() {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!^&*_+|?><,-=",
            retValFor = "";
        for (var i = 0, n = charset.length; i < this.state.charLength; ++i) {
            retValFor += charset.charAt(Math.floor(Math.random() * n));
        }
        this.setState({ retVal: retValFor })
    }

    async RemovingData(removeName) {
        await database()
            .ref(`PASS/${auth().currentUser.uid}/${removeName}`)
            .remove();
        this.LoadingPassword()
    }

    Modal() {
        const { bioModalVisible, modalVisible } = this.state;
        const password = AES_KEY.decryptData(this.state.bioPassword, my_secret_key);

        this.setState({ modalVisible: false })

        if (bioModalVisible === true) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bioModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{this.state.bioName}</Text>
                            {/* <Text style={styles.modalText}>{this.state.bioPassword}</Text> */}
                            <Text style={styles.modalText}>{password}</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 10 }}
                                onPress={() => {
                                    this.setState({ bioModalVisible: false, modalVisible: false });
                                }}
                            >
                                <Text style={styles.textStyle}>        Tamam        </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "green", margin: 20 }}
                                onPress={() => {
                                    Clipboard.setString(this.state.bioPassword);
                                    Toast.show({
                                        text: "Şifre Kopyalandı!",
                                        buttonText: "Tamam",
                                        type: "success",
                                    });
                                    this.setState({ bioModalVisible: false, modalVisible: false });
                                }}
                            >
                                <Text style={styles.textStyle}>        Kopyala        </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "red" }}
                                onPress={() => {
                                    this.setState({ bioModalVisible: false, modalVisible: false });
                                    Toast.show({
                                        text: "Şifre Silindi!",
                                        buttonText: "Tamam",
                                        type: "danger",
                                    });
                                    this.RemovingData(this.state.bioName);
                                }}
                            >
                                <Text style={styles.textStyle}>        Sil        </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.setModalVisible(true, item.name, item.subtitle)} >
                    <ListItem bottomDivider containerStyle={styles.renderItem}>
                        <ListItem.Content>
                            <ListItem.Title style={{ color: '#fff' }}>{item.name}</ListItem.Title>
                            <ListItem.Subtitle style={{ color: 'gray' }}>***************</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
            </View>
        )
    }

    Passwords() {
        if (this.state.firebaseControl === true) {
            return (
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.allPassword}
                        renderItem={this.renderItem}
                    />
                    {
                        this.Modal()
                    }
                </View>
            );
        }
        else {
            if (this.state.allPassword === 'error') {
                return (
                    <View style={styles.veriYok}>
                        <Image style={styles.image}
                            source={require('../images/01.gif')} />
                        <Text style={styles.yukleniyorText}>Veri Yok!</Text>
                    </View>
                )
            }

            return (
                <View style={styles.yukleniyorView}>
                    <Spinner color='red' />
                    <Text style={styles.yukleniyorText}>Yükleniyor...</Text>
                </View>
            )
        }
    }

    async AddFirebase() {
        const { name, password } = this.state
        const aeskey = await AES_KEY.generateKey();
        const hash = AES_KEY.encryptData(password, aeskey);
        database().ref(`PASS/${auth().currentUser.uid}/${name}`).set({
            name: name,
            subtitle: hash
        })
        await this.LoadingPassword();
    }

    AddPassword() {
        return (
            <Container style={styles.container}>
                <Content style={styles.addPassword}>
                    <Form style={{ width: '60%', alignSelf: 'center' }}>
                        <Item rounded>
                            <Input
                                style={styles.textInputText}
                                placeholder='Şifre Karakter Uzunluğu'
                                maxLength={2}
                                textAlign='center'
                                keyboardType='number-pad'
                                onChangeText={text => this.setState({ charLength: text })}
                            />
                        </Item>
                    </Form>

                    <Button light
                        style={styles.loginButton}
                        onPress={() => this.generatePassword()}>
                        <Text style={styles.buttonText}>ŞİFRE OLUŞTUR</Text>
                    </Button>

                    {
                        this.state.retVal == "" &&
                        <Text style={styles.newPassTextGuclu}>Güçlü Parola Burada Görünecek</Text>
                    }
                    <Text style={styles.newPassText}>{this.state.retVal}</Text>

                    <Button iconLeft light
                        style={styles.copyButton}
                        onPress={() => {
                            if (this.state.retVal == "") {
                                Toast.show({
                                    text: "Güçlü Şifre Yok!",
                                    buttonText: "Tamam",
                                    type: "danger"
                                })
                            } else {
                                Clipboard.setString(this.state.retVal);
                                Toast.show({
                                    text: "Şifre Kopyalandı!",
                                    buttonText: "Tamam",
                                    type: "success"
                                })
                            }
                            this.setState({ retVal: "" })
                        }}
                    >
                        <Icon name='copy' style={{ color: '#fff' }} />
                        <Text style={styles.buttonText}>Kopyala</Text>
                    </Button>

                    <Form >
                        <Item floatingLabel>
                            <Label>Hesap</Label>
                            <Input
                                style={styles.textInputText}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={(text) => this.setState({ name: text })} />
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
                    <Button light block style={styles.loginButton}
                        onPress={() => {
                            this.AddFirebase();
                            Toast.show({
                                text: "Şifre Kayıt Edildi!",
                                buttonText: "Tamam",
                                type: "success"
                            })
                        }}>
                        <Text style={styles.buttonText}>        ŞİFRE'Yİ KAYDET        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    Profil() {
        return (
            <View>
                <Text>
                    Profil
                </Text>
            </View>
        );
    }

    render() {
        if (this.state.modalVisible === true) {
            ReactNativeBiometrics.createKeys('Confirm fingerprint')
                .then((resultObject) => {
                    const { publicKey } = resultObject
                    //alert(publicKey)
                }).catch((error) => {
                    console.log(error)
                })

            ReactNativeBiometrics.createSignature({
                promptMessage: 'Parmak İzi Doğrula',
                payload: payload
            })
                .then((resultObject) => {
                    const { success, signature } = resultObject

                    if (success) {
                        this.setState({ bioModalVisible: true })
                    }
                    else {
                        alert("Parmak İzi Doğrulanamadı!")
                    }
                }).catch((error) => {
                    console.log(error)
                });
        }

        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Şifreler') {
                            iconName = focused
                                ? 'server-outline'
                                : 'server-outline';
                        } else if (route.name === 'Şifre Oluştur Ekle') {
                            iconName = focused ? 'key-outline' : 'key-outline';
                        } else if (route.name === 'Profil') {
                            iconName = focused ? 'finger-print-outline' : 'finger-print-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'red',
                    inactiveTintColor: 'gray',
                    activeBackgroundColor: '#1b1b1b',
                    inactiveBackgroundColor: '#1b1b1b'
                }}
            >
                <Tab.Screen name="Şifreler" component={this.Passwords.bind(this)} />
                <Tab.Screen name="Şifre Oluştur Ekle" component={this.AddPassword.bind(this)} />
                {/* <Tab.Screen name="Profil" component={this.Profil.bind(this)} /> */}
            </Tab.Navigator>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },

    addPassword: {
        flex: 1,
        backgroundColor: '#242424',
        paddingTop: 50,
        paddingHorizontal: 30
    },

    veriYok: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center'
    },

    yukleniyorView: {
        flex: 1,
        backgroundColor: '#242424',
        justifyContent: 'center',
        alignItems: 'center',
    },

    yukleniyorText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    },

    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain'
    },

    renderItem: {
        flex: 1,
        backgroundColor: '#1b1b1b',
    },

    createPassword: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingVertical: 150,
        paddingHorizontal: 80
    },

    loginButton: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 50,
        marginHorizontal: 30
    },

    copyButton: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 30
    },

    newPassText: {
        color: '#fff',
        textAlign: 'center'
    },

    newPassTextGuclu: {
        color: '#c6b2ac',
        textAlign: 'center',
        fontSize: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "#1b1b1b",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    modalText: {
        color: "white",
        marginBottom: 15,
        textAlign: "center"
    },

    buttonText: {
        color: '#fff'
    },

    textInputText: {
        color: '#fff'
    }


});

export default Main;
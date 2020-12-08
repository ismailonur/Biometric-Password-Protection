import * as React from 'react';
import { Text, View, BackHandler, Alert, FlatList, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem, Avatar } from 'react-native-elements';

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

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress = {() => alert(item.name)} >
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

    AddPassword() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>AddPassword!</Text>
            </View>
        );
    }

    CreatePassword() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>CreatePassword!</Text>
            </View>
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
                        } else if(route.name === 'Şifre Ekle'){
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
                <Tab.Screen name="Şifre Ekle" component={this.AddPassword} />
                <Tab.Screen name="Şifre Oluştur" component={this.CreatePassword} />
            </Tab.Navigator>
        )
    }
}

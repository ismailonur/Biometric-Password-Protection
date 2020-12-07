import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Main from './src/screens/Main';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
         screenOptions={{
           headerStyle: {
             backgroundColor: '#1b1b1b',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }}
      >
        <Stack.Screen name="Welcome" component={Welcome} 
         options={{ title: 'Hoşgeldiniz'}} 
        />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="Main" component={Main} options={{
          title: 'Şifreler', 
          headerLeft: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
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
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{
          title: 'Overview',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Overview' }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Overview' }} />
        <Stack.Screen name="Main" component={Main} options={{
          title: 'Overview', 
          headerLeft: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
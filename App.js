import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Root } from "native-base";

// Screens
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Main from './src/screens/Main';
import BioControl from './src/screens/BiometricControl';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  function checkUser() {
    //auth().signOut();
    let stacks;
    if (user !== null) {
      if (true) {
        stacks = <Stack.Screen name="BioControl" component={BioControl} options={{
          title: 'Biyometrik Koruma',
          headerLeft: false
        }} />;
        return stacks;
      }
    }

    stacks = <Stack.Screen name={"Welcome"} component={Welcome}
      options={{ title: "Güvenle Sakla" }}
    />
    return stacks;
  }

  return (
    <Root>
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

          {checkUser()}

          <Stack.Screen name="Main" component={Main} options={{ title: 'Biyometrik Koruma', headerLeft: false }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Giriş Yap' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Kayıt Ol' }} />


        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
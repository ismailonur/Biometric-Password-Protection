import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Root } from "native-base";

// Screens
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';
import BioControl from './screens/BiometricControl';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  function checkUser() {
    if (user !== null) {
      return <Stack.Screen name="BioControl" component={BioControl}
        options={{
          title: 'Biyometrik Koruma',
          headerLeft: false
        }} />;
    }

    return <Stack.Screen name={"Welcome"} component={Welcome}
      options={{ title: "Güvenle Sakla" }}
    />
  }

  if (initializing) return null;

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
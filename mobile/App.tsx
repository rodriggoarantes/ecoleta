import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { useFonts, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Container, Safe } from './src/components/Container';
import { Background } from './src/components/Background';

import Home from './src/pages/Home';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Background>
        <Container>
          <Safe>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Main"
                  component={Home}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Safe>
        </Container>
      </Background>
    </>
  );
}

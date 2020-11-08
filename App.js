import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RestaurantSelector from './screens/RestaurantSelector';
import ImageDisplay from './screens/ImageDisplay.js'

import * as firebase from 'firebase';
import {firebaseConfig} from './config/firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  console.log("configuration:"+firebaseConfig.storageBucket);
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "WelcomeScreen" component={WelcomeScreen} options={ {headerShown: false }}/>
        <Stack.Screen name= "RestaurantSelector" component={RestaurantSelector} options={ {headerShown: false }}/>
        <Stack.Screen name= "CameraScreen" component={CameraScreen} options={ {headerShown: false }}/>
        <Stack.Screen name= "ImageDisplay" component={ImageDisplay} options={ {headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

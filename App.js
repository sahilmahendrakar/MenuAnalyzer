import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen'
import uuid from 'uuid';
import * as firebase from 'firebase';
import {firebaseConfig} from './config/firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';
import { imageToText } from './api/ImageToText';
import { getReviewsAndAnalysis } from './api/ReviewsAndAnalysis';

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  console.log("configuration:"+firebaseConfig.storageBucket);
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  getReviewsAndAnalysis('le-bernardin-new-york', 'wine').then((body) => console.log(body))
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "CameraScreen" component={CameraScreen} options={ {headerShown: false }}/>
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

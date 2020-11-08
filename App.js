import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen'
import uuid from 'uuid';
import * as firebase from 'firebase';
import {firebaseConfig} from './config/firebaseconfig';
import { createStackNavigator } from '@react-navigation/stack';
import {searchDictionary2} from './culinary_dictionary/searchDictionary2.js'

import Fuse from 'fuse.js';

const dictionary = require('./culinary_dictionary/culinaryDictionary.json');
const Stack = createStackNavigator();
const searchTerm = "ashar";

if (!firebase.apps.length) {
  console.log("configuration:"+firebaseConfig.storageBucket);
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  console.log("Hello World!")
  console.log(searchDictionary(searchTerm))
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "CameraScreen" component={CameraScreen} options={ {headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// set up fuzzy search
const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
      "term"
    ]
  };

export const searchDictionary = (term) => {
    const fuse = new Fuse(dictionary, options);
    var searchResults = fuse.search(term);
    console.log(searchResults, searchResults.length)
    return searchResults[0].item.definition; // get best definition
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

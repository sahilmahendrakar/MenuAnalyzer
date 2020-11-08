import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { imageToText } from '../backend/ImageToText';

export default function MenuDisplayScreen({route, navigation}) {
    const [menuItems, setMenuItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        imageToText(route.params.image_id).then((text) => {
            console.log('loading...' + route.params)
            console.log(text)
            setMenuItems(text)
      }).finally(() => setIsLoading(false))
    }, [])

    const itemSelected = (item) => {
        navigation.navigate('ReviewScreen', {dish: item});
    }
    
    return (
      <View style={styles}>
          {isLoading ? <ActivityIndicator/> : (menuItems.map((item, i) => <TouchableOpacity onPress={()=> itemSelected(item)} key={i}><Text>{item}</Text></TouchableOpacity>))}
      </View>
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

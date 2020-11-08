import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageToText } from '../backend/ImageToText';
import styling from '../styling';

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
        navigation.navigate('ReviewScreen', {restaurant: route.params.restaurant, dish: item});
    }
    
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Choose a Dish!</Text>
          {/* {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (<FlatList 
            data={menuItems}
            renderItem={({item}) => (<TouchableOpacity onPress={()=> itemSelected(item)}><Text>{item}</Text></TouchableOpacity>)}
          />)} */}
          <View style={{padding:5}}/>
          <ScrollView contentContainerStyle={styles.scroll}>
                {isLoading ? <View></View> : (<View>
                <TouchableOpacity style={styles.dishBtn} onPress={()=> itemSelected("Salmon")} ><Text style={styles.dishText}>Salmon</Text></TouchableOpacity>
                </View>)}
              {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (menuItems.map((item, i) => <TouchableOpacity style={styles.dishBtn} onPress={()=> itemSelected(item)} key={i}><Text style={styles.dishText}>{item}</Text></TouchableOpacity>))}
              {isLoading ? <View></View> : (<View>
              <TouchableOpacity style={styles.dishBtn} onPress={()=> itemSelected("Fruit Compote")}><Text style={styles.dishText}>Fruit Compote</Text></TouchableOpacity>
              </View>)}
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styling.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
      color: "white",
    marginTop: 20,
    fontSize: 50,
    fontWeight: "bold",
  },

  scroll: {
      flexGrow: 1,
      justifyContent: 'center',
  },

  dishBtn: {
    backgroundColor:styling.secondaryColor,
    borderRadius:25,
    padding: 10,
    margin: 10,
  },

  dishText: {
      color:"white",
      fontWeight:"bold",
      textAlign: 'center'
  }
});

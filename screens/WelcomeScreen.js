import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import styling from '../styling';


const locate = (nav) => {
    (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let l = await Location.getCurrentPositionAsync()
        console.log(l)
        nav.navigate("RestaurantSelector", {location:l})
      })();
}


const WelcomeScreen = ({navigation}) =>{
    return (
        <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.text}>Foodi</Text>

      <TouchableOpacity activeOpacity={0.8} style={{top:50}} onPress = {() => locate(navigation)}>
        <View style = {{alignItems: 'center', backgroundColor: '#fb5b5a',
                    justifyContent: 'center', borderRadius: 30, paddingRight:30, paddingLeft:30, paddingVertical:10}}> 
        <Text style = {{color: 'white', fontWeight:'bold'}}>Locate!</Text> 
    </View>
</TouchableOpacity> 
      <StatusBar style="auto" />
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: styling.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 50,
      fontWeight: "bold",
      color: "white",
      fontFamily: styling.mainFont
    },
    image: {
      top: -50,
      width: 150,
      height: 150,
      tintColor: '#fff',
      resizeMode: 'contain',
    }
  });
  

export default WelcomeScreen;
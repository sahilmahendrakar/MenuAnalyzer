import * as React from 'react';
import { ScrollView,StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import styling from '../styling';

const YELP_API_KEY = '9xPHVV7uN6qjA0KF-M6TtsCn2-oMPCa2orDX85XZCAa9EL9hJA0A9U_1OTRUuivYYnoNw0XVgEZ_Z-AIWwBkVY2-2hP6DsL_obYbAm_bcbFVxwysbm68WP7bb-WmX3Yx';


const getRestaurantsFromLatLong = (lat, long) => {
    return fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=${lat}&longitude=${long}&sort_by=distance`, {headers: {
          authorization: 'Bearer ' + YELP_API_KEY,
      }})
      .then((response) => response.json())
      .then((json) => {
        return json.businesses;
      })
      .catch((error) => {
        console.error(error);
      });
}

const onSelection = (restaurantalias,nav) => {
    console.log(restaurantalias)
    alert('You tapped the button!')
    nav.navigate("CameraScreen",{restaurant:restaurantalias})
}

export default class RestaurantSelector extends React.Component {
    state = {
        restaurants: null
    }
    
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.route.params);
        getRestaurantsFromLatLong(this.props.route.params.location.coords.latitude, this.props.route.params.location.coords.longitude)
        .then((rlist) => {
                this.setState({restaurants:rlist})
            }
        )
    }
    

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View justifyContent = 'center' marginTop ='5%'><Text style={styles.header}>Where to Eat?</Text></View>
                <ScrollView style={styles.scrollView}>
                    {this.state.restaurants===null? []:this.state.restaurants.map((restaurant, key)=>(
                        <View key={key} style = {styles.restContainer}>
                            <View style={styles.imageContainer}>
                                <Image source = {{uri: restaurant.image_url}} style ={styles.image} />
                            </View>
                            <View flex={1}>
                                <TouchableOpacity onPress = {() => onSelection(restaurant.restaurantalias, this.props.navigation)}>
                                    <Text style={styles.text}>{restaurant.name}</Text>
                                </TouchableOpacity>
                            </View>
                    </View>))}
                </ScrollView>
            </SafeAreaView>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styling.primaryColor,
    },
    header:{
        fontSize: 50,
        fontWeight: "bold",
        color: "white",
        fontFamily: styling.mainFont
    },
    scrollView: {
        backgroundColor: styling.primaryColor,
        marginHorizontal: 20,
        marginTop:10
    },
    restContainer:{
        backgroundColor: styling.secondaryColor,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    imageContainer: { 
        width: 100, 
        height: 100,
        flex:1 
    },
    image: { 
        width: 100, 
        height: 100 
    },text: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        fontFamily: styling.mainFont
    }
})
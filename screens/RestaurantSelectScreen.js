import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getRestaurantsFromLatLong } from '../backend/YelpApi';

export default function RestaurantSelectScreen(props) {
    const [restaurants, setRestaurants] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      getRestaurantsFromLatLong(0.0, 0.0).then((restaurantList) => {
        //console.log('loading')
        setRestaurants(restaurantList)
      }).finally(() => setIsLoading(false))
    }, [])
    
    return (
      <View></View>
      // <View style={styles}>{isLoading ? <ActivityIndicator/> : (
      //     <FlatList
      //       data={restaurants}
      //       keyExtractor={({ id }, index) => id}
      //       renderItem={({ item }) => (
      //         <Text>{item.title}, {item.releaseYear}</Text>
      //         )}
      //       />
      //     )}</View>
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

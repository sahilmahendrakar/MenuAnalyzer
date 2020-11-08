import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getRestaurantsFromLatLong } from '../API/YelpAPI';

export default function RestaurantSelectScreen(props) {
    const [restaurants, setRestaurants] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getRestaurantsFromLatLong(0.0, 0.0).then((restaurantList) => setRestaurants(restaurantList)).finally(() => setIsLoading(false))
    })
    
    return (
        <View style={styles}>{isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={restaurants}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.title}, {item.releaseYear}</Text>
              )}
            />
          )}</View>
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

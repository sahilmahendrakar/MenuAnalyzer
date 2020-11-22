import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { imageToText } from '../backend/ImageToText';

export default function ReviewScreen({route, navigation}) {
    const [reviews, setReviewItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(route.params);
    }, [])

    return (
      <View style={styles}>
          
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

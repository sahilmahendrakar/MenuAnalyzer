import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { getReviewsAndAnalysis } from '../backend/ReviewsAndAnalysis';
import { searchDictionary } from '../backend/Dictionary';
import {styling } from '../config.styling';

function InfoGodScreen(props) {
    const [reviews, setReviews] = useState(null);
    const [def, setDefinition] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const restaurantAlias = "le-bernardin-new-york";
    const dish = "salmon"; 

    useEffect(() => {
        getReviewsAndAnalysis(restaurantAlias, dish).then((reviews) => {
            setReviews(reviews)
        })

        
    }, [])

    const def = "peepepoopoo";
    const reviews = ["hehehehheehhe", "hohohohoohoohoh", "hiihihihiihihi", "huhuhuhuhuhuhuuhuh", "hahahahahaha", "gagaggagag", "ugugugugugugugug", "igigigiigigigigig"];
    
    const getTopRevs = (reviews) => {return [reviews[0], reviews[1], reviews[2]]};
    const getBotRevs = (reviews) => {return [reviews[6], reviews[5], reviews[4]]};

    

    // var topRevs = reviews ? getTopRevs(reviews) : null;
    // var botRevs = getBotRevs(reviews).toString();
    // console.log("OUTPUT: " + (reviews ? getTopRevs(reviews).toString() : null));

    return (
        <SafeAreaView style={styles.container}>
        {/* {isLoading ? <ActivityIndicator/> :  */}
        <View style={styles.h1box}> 
            <Text style={styles.h1text}>All about {dish} !</Text>
        </View>

        <View style={styles.h2box}> 
            <Text style={styles.h2text}>What other people are saying</Text>
        </View>

            <View style={styles.revs}>
                
                <ScrollView> 
                    <Text>{getTopRevs(reviews)[0]}</Text>
                    <Text>{getTopRevs(reviews)[1]}</Text>
                </ScrollView>

                <ScrollView> 
                    <Text>{getBotRevs(reviews)[0]}</Text>
                    <Text>{getBotRevs(reviews)[1]}</Text>
                </ScrollView>
            </View>

        <View style={styles.h2box}> 
            <Text style={styles.h2text}> Some background and definitions</Text>
        </View>

            <ScrollView contentContainerStyle={styles.defi}>
                <Text>{def}</Text>

            </ScrollView>
        {/* } */}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
      },
    revs: {
        flex: 1,
        // height: 200,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    defi: {
        // height: 10,
        // flex: 0.05,
        // alignSelf: "baseline",
        width: Dimensions.get('window').width,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    h1box: {
        height: 60,
        width: Dimensions.get('window').width,
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1text: {
        fontSize:50,
    },
    h2box: {
        height: 40,
        width: Dimensions.get('window').width,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h2text: {
        fontSize:30,
    },
    text: {
        fontSize: 20,
    }
})

export default InfoGodScreen;


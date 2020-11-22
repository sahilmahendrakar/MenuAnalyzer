import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import styling from '../config/styling';

import { getReviewsAndAnalysis } from '../backend/ReviewsAndAnalysis';
import { searchDictionary } from '../backend/Dictionary';


function InfoGodScreen(props) {
    // const [reviews, setReviews] = useState(null);
    // const [def, setDefinition] = useState(null);
    // const [isLoading, setIsLoading] = useState(true)

    // const restaurantAlias = "le-bernardin-new-york";
    const dish = "salmon"; 
    const dishCap = dish.substring(0,1).toUpperCase() + dish.substring(1);

    // useEffect(() => {
    //     setDefinition("peepepoopoo");
    //     setReviews(["hehehehheehhe", "hohohohoohoohoh", "hiihihihiihihi", "huhuhuhuhuhuhuuhuh", "hahahahahaha", "gagaggagag", "ugugugugugugugug", "igigigiigigigigig"])
    //     setIsLoading(true);
    //     // getReviewsAndAnalysis(restaurantAlias, dish).then((analysis) => {
    //     //     console.log("foo");
    //     //     console.log(analysis);
    //     //     setReviews(analysis);
    //     //     setDefinition(searchDictionary(dish));

            
    // //   }).finally(() => setIsLoading(false))
    // }, [])

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
        <View style={{height:20}}></View>

        <View style={styles.container}>

        <View style={styles.h1box}> 
            <Text style={styles.h1text}> All about {dishCap}! </Text>
        </View>

        <View style={styles.h2box}> 
            <Text style={styles.h2text}> What Other People are Saying </Text>
        </View>

            <View style={styles.revs}>
                
                <ScrollView contentContainerStyle={styles.scroll}> 
                    <Text style={styles.text}>"{getTopRevs(reviews)[0]}"{"\n"}</Text>
                    <Text style={styles.text}>"{getTopRevs(reviews)[1]}"{"\n"}</Text>
                </ScrollView>

                <ScrollView contentContainerStyle={styles.scroll}> 
                    <Text style={styles.text}>"{getBotRevs(reviews)[0]}"{"\n"}</Text>
                    <Text style={styles.text}>"{getBotRevs(reviews)[1]}"{"\n"}</Text>
                </ScrollView>
            </View>

        <View style={styles.h2box}> 
            <Text style={styles.h2text}> Terms to Know </Text>
        </View>

            <ScrollView contentContainerStyle={styles.defi}>
                
                <Text style={styles.text}>
                    <Text style={{fontWeight: "bold", alignText: "left"}}>{dishCap}: </Text>
                    {def}
                </Text>

            </ScrollView>
        {/* } */}
        </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        backgroundColor: styling.primaryColor,
      },
    revs: {
        flex: 1,
        // height: 200,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        left: 8
    },
    defi: {
        // height: 10,
        // flex: 0.05,
        // alignSelf: "baseline",
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    h1box: {
        // flex: 0.3,
        // width: Dimensions.get('window').width,
        // backgroundColor: styling.secondaryColor,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        flexWrap: 'wrap',
        padding: 15
    },
    h1text: {
        fontSize:40,
        color: styling.secondaryColor,
        fontFamily: styling.mainFont,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    h2box: {
        // height: 40,
        // flex:1,
        backgroundColor: styling.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    h2text: {
        fontSize:24,
        // alignSelf: 'center',
        color: '#fff',
        fontFamily: styling.mainFont,
        fontWeight: 'bold',
        justifyContent: 'center',
        padding:10
    },
    scroll: {
        flexGrow: 1, 
        // justifyContent: 'center',
    },
    text: {
        fontSize: 17,
        fontFamily: styling.mainFont,
    }
})

export default InfoGodScreen;


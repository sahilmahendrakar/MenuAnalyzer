import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';


import { getReviewsAndAnalysis } from '../backend/ReviewsAndAnalysis';
import { searchDictionary } from '../backend/Dictionary.js';
import styling from '../styling';


function InfoGodScreen({route, navigation}) {
    const [dishCap, setDish] = useState(null)
    const [reviews, setReviews] = useState(null);
    const [def, setDefinition] = useState(null);
    const [sentiment, setSentiment] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setDish(route.params.dish)
        
        if(route.params.dish == "Salmon") {
            setDefinition("Salmon is the common name for several species of ray-finned fish in the family Salmonidae. Salmon can be prepared in a variety of ways, but is often grilled ");
            setReviews(["...we had to leave, but the waiter was really nice. We packed our salmon to go and it was fantastic even after eating it at home! We are definitely going to...", 
            "...oysters, lobsters, mussels. Overall their seafood is amazing, especially their salmon. Would recommend to anyone who wants a little taste of the ocean...", 
            "...third time ordering the grilled lemon salmon, and we have never been disappointed...", 
            "...was terrible. We were seated right next to the bathroom which made my salmon smell even worse...", 
            "...Never coming back here again. My grilled salmon was grossly undercooked and the service was...", 
            "...I am a huge fan of seafod, but the lobster and salmon made me never want to come back here again..."])
            setSentiment("+0.72")
        } else {
            setDefinition("Langoustine is a large, commercially important prawn Langoustines are considered a delicacy. The white fleshy meat in the tail and body is juicy, slightly sweet and lean.")
            setReviews(
                ["...the seafood is absolutely amazing, especially the langoustine", 
                "...the langoustine was succulent, lean and tasty. Definitely gonna be coming back soon.", 
                "...was a bit skeptical after trying the shrimp a couple weeks ago, but the langoustine was significantly better and I am pleasantly surprised", 
                "...I expected more from such a highly rated restaurant, the langoustine had an overwhelming stench...", "...absolutely terrible. The mussels smelled like an 80 year old man, and the langoustine made me feel like I was eating my grandma's feet...", "... The chicken parm was terrible, and the languoustine was average"])
            setSentiment("-0.03")
        }
        
        setTimeout(() => { setIsLoading(false) }, 2000)
    }, [])
    

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

    const getTopRevs = (reviews) => {return [reviews[0], reviews[1], reviews[2]]};
    const getBotRevs = (reviews) => {return [reviews[3], reviews[4], reviews[5]]};

    

    // var topRevs = reviews ? getTopRevs(reviews) : null;
    // var botRevs = getBotRevs(reviews).toString();
    // console.log("OUTPUT: " + (reviews ? getTopRevs(reviews).toString() : null));

    return (
        <SafeAreaView style={styles.container}>
                    <View style={{height:20}}></View>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : 


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
                    <Text style={styles.text}>"{getTopRevs(reviews)[2]}"{"\n"}</Text>
                </ScrollView>

                <ScrollView contentContainerStyle={styles.scroll}> 
                    <Text style={styles.text}>"{getBotRevs(reviews)[0]}"{"\n"}</Text>
                    <Text style={styles.text}>"{getBotRevs(reviews)[1]}"{"\n"}</Text>
                    <Text style={styles.text}>"{getBotRevs(reviews)[2]}"{"\n"}</Text>
                </ScrollView>
            </View>
    <Text style={{fontWeight:'bold', fontSize: 20, margin: 5}}> {`Overall Sentiment: ${sentiment}`} </Text>
        <View style={styles.h2box}> 
            <Text style={styles.h2text}> Terms to Know </Text>
        </View>

            <ScrollView contentContainerStyle={styles.defi}>
                
                <Text style={styles.text}>
                    <Text style={{fontWeight: "bold", textAlign: "left"}}>{dishCap}: </Text>
                    {def}
                </Text>

            </ScrollView>
        </View>}
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
        // alignSelf: "baseline",
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
        padding: 5,
        fontSize: 17,
        fontFamily: styling.mainFont,
    }
})

export default InfoGodScreen;
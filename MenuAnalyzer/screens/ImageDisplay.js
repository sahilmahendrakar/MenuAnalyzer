
import React, { Component } from 'react';
import { Text, View, TouchableOpacity,
	Image, Dimensions, ActivityIndicator,PanResponder,
    StyleSheet} from 'react-native';
import { nanoid } from 'nanoid/async/index.native';
import firebase from 'firebase';
import * as ImageManipulator from 'expo-image-manipulator';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var xmult = 0;
var ymult = 0;

export default class CameraScreen extends React.Component{
    state = {
        x1: 0,
        y1: 0,
        dx:100,
        dy:200,
        boxopacity: 0.2,
        uploading:false
    };

    constructor(props){
        super(props);
        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
            onMoveShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
              false,
      
            onPanResponderGrant: (evt, gestureState) => {
              // The gesture has started. Show visual feedback so the user knows
              // what is happening!
              // gestureState.d{x,y} will be set to zero now
              console.log(gestureState);
              console.log('touch move at:', 'X='+gestureState.x0, 'Y='+gestureState.y0);
              this.setState({x1:gestureState.x0, y1:gestureState.y0, dx:1,dy:1})
            },
            onPanResponderMove: (evt, gestureState) => {
              // The most recent move distance is gestureState.move{X,Y}
              // The accumulated gesture distance since becoming responder is
              // gestureState.d{x,y}
              
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
              true,
            onPanResponderRelease: (evt, gestureState) => {
              // The user has released all touches while this view is the
              // responder. This typically means a gesture has succeeded
              console.log('touch end');
              console.log(gestureState);
              /***if (gestureState.locationX > this.state.x1){
                  this.setState({dx:gestureState.x0})
              }else{
                  this.setState({x1:gestureState.x0, dx:gestureState.x0})
              }if (gestureState.locationY > this.state.y1){
                  this.setState({dy:gestureState.moveY - this.state.y1})
              }else{
                  this.setState({y1:gestureState.moveY,dy:gestureState.moveY})
              }**/
              this.setState({dx:gestureState.dx, dy:gestureState.dy})
              console.log(this.state.x1,this.state.y1,this.state.dx,this.state.dy)
            },
            onPanResponderTerminate: (evt, gestureState) => {
              // Another component has become the responder, so this gesture
              // should be cancelled
              console.log("germinate")
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              // Returns whether this component should block native components from becoming the JS
              // responder. Returns true by default. Is currently only supported on android.
              console.log("block")
              return true;
            }
          });
    }
    componentDidMount(){
        xmult = this.props.route.params.img.width/windowWidth;
        ymult = this.props.route.params.img.height/windowHeight;
    }

    press = async (nav) =>{
        
        console.log(this.state.x1,this.state.y1,this.state.dx,this.state.dy)
        var bx = {originX: xmult*this.state.x1, originY: ymult*this.state.y1, width:xmult*this.state.dx, height:ymult*this.state.dy}
        const manipResult = await ImageManipulator.manipulateAsync(
            this.props.route.params.img.uri, [{crop:bx}],{ compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )        
        this._handleImagePicked(manipResult);
    }

    
   /** 
    handleResponderMove(evt){
        console.log(evt);
        console.log('touch move at:', 'X='+evt.pageX, 'Y='+evt.pageY);
        this.setState({x1:evt.locationX, y1:evt.locationY})
    }
      //touch end/up
    handleResponderRelease(evt){
        console.log('touch end');
        if (evt.locationX > this.state.x1){
            this.setState({dx:evt.locationX - this.state.x1})
        }else{
            this.setState({x1:evt.locationX,dx:this.state.x1-evt.locationX})
        }if (evt.locationY > this.state.y1){
            this.setState({dy:evt.locationY - this.state.y1})
        }else{
            this.setState({y1:evt.locationY,dy:this.state.y1-evt.locationY})
        }
    } */
    
    render(){return(
        <View style = {styles.container}>
            <View style = {styles.container} {...this.panResponder.panHandlers}>
                <Image style = {styles.imagestyle} source={(this.props.route.params.img)}/>
                <View position="absolute" left= {this.state.x1} top = {this.state.y1} width = {this.state.dx} height = {this.state.dy} backgroundColor = 'white' 
                    opacity = {this.state.boxopacity}></View>
                {this._maybeRenderUploadingOverlay()}
            </View>
                <TouchableOpacity style ={styles.button} onPress = {() => this.press(this.props.navigation)}>
                <View style = {{alignItems: 'center', backgroundColor: '#fb5b5a',
                    justifyContent: 'center', borderRadius: 30, width: '100%', height:'100%'}}> 
                <Text style = {{color: 'white', fontWeight:'bold'}}>Search</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
    };
    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });
    
            if (!pickerResult.cancelled) {
                const [uploadUrl, uuid, uri] = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
                this.props.navigation.navigate('WelcomeScreen', {image_id: uuid,img:pickerResult,rest:this.props.route.params.rest});
            }
        } catch (e) {
            console.log("error: "+e);
            console.log(blob)
            console.log(firebase.storage.Reference.bucket)
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
        resolve(xhr.response);
        };
        xhr.onerror = function(e) {
        console.log("blob: "+e);
        reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    let uuid = await nanoid();
    const ref = firebase.storage().ref().child(uuid);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    let uploadUri = await snapshot.ref.getDownloadURL()

    return [uploadUri, uuid,uri];
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor:'white'
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null
    },
    box:{
        position: "absolute",

    },
    button:{
        position: "absolute",
        bottom: '5%',
        left: '70%',
        width: '25%',
        height: '10%'
    }
})
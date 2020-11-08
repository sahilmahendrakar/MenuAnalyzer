import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator,
	Button,
	FlatList,
	Image,
	Share,
	StyleSheet,
	ScrollView} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import {firebaseConfig} from '../config/firebaseConfig';
import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import { nanoid } from 'nanoid/async/index.native';


if (!firebase.apps.length) {
    console.log("configuration:"+firebaseConfig.storageBucket);
    firebase.initializeApp(firebaseConfig);
}


export default class CameraScreen extends React.Component{
    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        image: null,
        uploading: false,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        this._handleImagePicked(photoData);
    };


    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures}/>}
                {this._maybeRenderUploadingOverlay()}
                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
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
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log("error: "+e);
            console.log(firebase.storage.Reference.bucket)
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
    
}

async function uploadImageAsync(uri) {
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

    const ref = firebase.storage().ref().child(await nanoid());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}
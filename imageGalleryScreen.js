import React, { Component } from 'react';
import {StatusBar, TouchableOpacity, View } from 'react-native';
import {Icon} from 'react-native-elements';
import SmartGallery from "react-native-smart-gallery";
import StyleCommons from './assets/styles/StyleCommons';
import Orientation from 'react-native-orientation-locker';

export default class ImageGalleryScreen extends React.Component {

    constructor(props) {
        super(props);
        Orientation.unlockAllOrientations();
    }

    componentDidMount() {
       StatusBar.setHidden(true);
       Orientation.unlockAllOrientations();
    }

    render() {
        return (
            <View style={StyleCommons.container}>
                <SmartGallery
                    images={this.props.navigation.state.params.pictures.map(function(picture) {
                        return {
                            uri : picture
                        }
                    })}
                    // onEndReached={() => {
                    // add more images when scroll reaches end
                    // }}
                    // Change this to render how many items before and after it.
                    loadMinimal={true}
                    loadMinimalSize={2}
                    // Turning this off will make it feel faster
                    // and prevent the scroller to slow down
                    // on fast swipes.
                    sensitiveScroll={false}
                    index = {this.props.navigation.state.params.index}
                />
                <TouchableOpacity style={{flex:1,alignSelf:'flex-start',top: 24,left:16,position: 'absolute'}} onPress={()=>this.props.navigation.goBack()}>
                    <Icon color="white" name={"close"} size={24}/>
                </TouchableOpacity>
            </View>
        )
    }
}
import React, { Component } from 'react';
import {StatusBar, TouchableOpacity, View } from 'react-native';
import {Icon} from 'react-native-elements';
import SmartGallery from "react-native-smart-gallery";
import StyleCommons from './assets/styles/StyleCommons';

export default class ImageGalleryScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       StatusBar.setHidden(true);
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
                />
                <TouchableOpacity style={{flex:1,alignSelf:'flex-start',top: 26,left:8,position: 'absolute'}} onPress={()=>this.props.navigation.goBack()}>
                    <Icon color="white" name={"close"} size={20}/>
                </TouchableOpacity>
            </View>
        )
    }
}
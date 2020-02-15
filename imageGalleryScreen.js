import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import SmartGallery from "react-native-smart-gallery";

export default class ImageGalleryScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       StatusBar.setHidden(true);
    }

    render() {
        console.log(this.props.navigation.state.params.pictures)
        return (
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
        )
    }
}
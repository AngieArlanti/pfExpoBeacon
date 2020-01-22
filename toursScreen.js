import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

export default class ToursScreen extends React.Component {
    
    render() {
        return(
        <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor = '#609bd1' translucent = {true}/>
            <View style={styles.top} >
            <Text> Tours Screen !!</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});
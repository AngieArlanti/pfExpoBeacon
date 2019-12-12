import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ToursScreen extends React.Component {
    
    render() {
        return(
        <View style={styles.container}>
            <Text> Tours Screen !!</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});
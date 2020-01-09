import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';

export default class ProfileScreen extends React.Component {
    
    render() {
        return(
        <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor = "rgba(0,0,0,0)" translucent = {true}/>
            <View style={styles.top} >
             <Header 
             centerComponent={{ text: 'Perfil', style: { color: '#fff' } }}
            />
            <Text> Profile Screen !!</Text>
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
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';

/**
* @param props properties needed to render NoInternetView:
* - retry: array of stands' data.
*/


export default class NoInternetView extends React.Component {
  constructor(props){
  super(props);

}

  render () {
    return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} resizeMode='cover' source={require('../assets/images/network-error.png')}/>
      <Text style={styles.mainLabel}>¡Parece que no hay internet!</Text>
      <Text style={styles.secondaryLabel}>Revisa tu conexión para seguir navegando</Text>
      <Text style={styles.actionLabel} onPress={this.props.onPress}>Reintentar</Text>
    </View>
    )}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'center',
   backgroundColor: 'white',
 },
 imageContainer:{
   marginTop: 140,
   marginBottom: 16,
 },
 mainLabel:{
   fontSize: 24,
   fontWeight:'600',
   marginBottom: 8,
 },
 secondaryLabel:{
   fontSize: 18,
   marginBottom: 16,
 },
 actionLabel:{
   fontSize: 20,
   color: '#3d7ab3',
 },
})

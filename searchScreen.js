import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import StandList from './standList';
import * as Constants from './assets/constants/constants'
import MapComponentView from './components/MapComponentView';


export default class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true};
    this.state = { isDataAvailable: false};
    this.state = { data: [{}]};
    this.state = { standsDataSource:[{}]};
  }

  componentWillUnmount() {
    this.startSubscription.remove();
    this.stopSubscription.remove();
  }

  // Lifecycle events
  componentDidMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAllStands();
    });
  }

  // TODO Eliminar cuando conectemos con server real.
  // REEMPLACEN POR SU IP SI CORREN EN ANDROID FISICO, LA PUEDEN OBTENER CON: ifconfig | grep "inet " | grep -v 127.0.0.1
  // REEMPLAZAR POR 10.0.2.2 SI CORREN EN EMULADOR ANDROID
  // Services TODO: Modularize
  getAllStands(){
    return fetch('http://10.0.2.2:8080/stands/list')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        standsDataSource: responseJson,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

render() {

  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={false} backgroundColor="#609bd1" translucent={true}/>
      <MapComponentView style={styles.container} stands={this.state.standsDataSource} mapType={"STANDARD"} navigation={this.props.navigation} />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
  });

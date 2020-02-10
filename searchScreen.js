import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import StandList from './standList';
import * as Constants from './assets/constants/constants'
import MapComponentView from './components/MapComponentView';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from './assets/constants/constants';


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

  // Services TODO: Modularize
  getAllStands(){
    return fetch(STAND_LIST_SERVICE_URL)
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
      {
        (this.state.standsDataSource.length!==1) && <MapComponentView style={styles.container} stands={this.state.standsDataSource} mapType={MAP_COMPONENT_VIEW_TYPES.DEFAULT} navigation={this.props.navigation} />
      }

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
  });

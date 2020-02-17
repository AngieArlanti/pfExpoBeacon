import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import * as Constants from '../assets/constants/constants'
import MapComponentView from '../components/MapComponentView';
import {Icon} from 'react-native-elements';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from '../assets/constants/constants';

export default class DirectionsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { target_stand: null};
  }

render() {
  if(this.state.target_stand ===null){
    let stand = [];
    stand.push(this.props.navigation.state.params.target_stand);
    this.state.target_stand = stand;
  }
  return (
    <View style={styles.container}>
      {
        (this.props.navigation.state.params.target_stand!==undefined && this.state.target_stand!==null) && <MapComponentView style={styles.container} stands={this.state.target_stand} mapType={MAP_COMPONENT_VIEW_TYPES.ROUTE} navigation={this.props.navigation} />
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

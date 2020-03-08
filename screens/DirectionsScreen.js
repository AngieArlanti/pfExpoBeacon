import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import * as Constants from '../assets/constants/constants'
import MapComponentView from '../components/MapComponentView';
import {Icon} from 'react-native-elements';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from '../assets/constants/constants';
import getDistance from 'geolib/es/getDistance';

export default class DirectionsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { target_stand: null};
    this.state = { target_location: null};
    this.state.origin = {
      latitude: -34.6403200,
      longitude: -58.401555,
    };
    this.state.distance = 0;
  }

render() {
  if(this.state.target_stand ===null || this.state.target_stand===undefined){
    let stand = [];
    stand.push(this.props.navigation.state.params.target_stand);
    if (stand!==undefined){
      let location = stand.map(function(stand){
        return {
          latitude : stand.latitude,
          longitude : stand.longitude
        }
      });
      this.state.distance = getDistance(this.state.origin,location[0], 0.01);

      this.state.target_stand = stand;
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={false} backgroundColor="#609bd1" translucent={true}/>
      {
        (this.props.navigation.state.params.target_stand!==undefined && this.state.target_stand!==undefined  && this.state.ditance!==0) && <MapComponentView style={styles.container} stands={this.state.target_stand} target_distance={this.state.distance} mapType={MAP_COMPONENT_VIEW_TYPES.ROUTE} navigation={this.props.navigation} />
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

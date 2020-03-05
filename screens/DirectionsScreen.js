import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, DeviceEventEmitter, StatusBar} from 'react-native';
import * as Constants from '../assets/constants/constants'
import MapComponentView from '../components/MapComponentView';
import {Icon} from 'react-native-elements';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES, GET_LOCATION_SERVICE_URL} from '../assets/constants/constants';
import getDistance from 'geolib/es/getDistance';
import {startRangingBeacons, stopRangingBeacons} from '../services/beaconManagerClient';
import { getUniqueId } from 'react-native-device-info';
import {getNearbyStands} from '../services/locationClient';

var BeaconManager = require('NativeModules').BeaconManager;

export default class DirectionsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { target_stand: null};
    this.state = { target_location: null};
    this.state.distance = 0;
    this.state.startSuscription = null;
    this.state.stopSuscription = null;
    this.state.origin = {};
    this.state.l = {}
    this.getLocation();
  }

  getLocationApiCall(beacons) {
    return fetch(GET_LOCATION_SERVICE_URL, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_id: getUniqueId(),
        nearby_stands: getNearbyStands(beacons)
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.state.l = responseJson
      }, function(){
        const loc = {
          latitude: null,
          longitude: null
        };
        let lat = this.state.l.latitude
        let lon = this.state.l.longitude
        console.log("lat:" + lat)
        console.log("lon:" + lon)
        loc.latitude = lat
        loc.longitude = lon
        this.state.origin = loc
        console.log(this.state.origin)
    })
    .catch((error) => {
      console.error(error);
    });
  };

suscribeForEvents = () => {
    this.setState({ startSuscription : DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
      if(data.beacons.length>1){
        stopRangingBeacons(this.unsuscribeForEvents);
        this.getLocationApiCall(data.beacons);
      }
  })
})
};

unsuscribeForEvents = () => {
 this.setState({ stopSuscription : DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
     this.removeSuscription(this.state.startSubscription);
  })
})
};

removeSuscription = (suscription) => {
  if (suscription!==undefined && suscription!==null){
    suscription.remove();
  }
};

removeAllSuscriptions = () => {
  this.removeSuscription(this.state.startSubscription);
  this.removeSuscription(this.state.stopSubscription);
};

  getLocation(){
    startRangingBeacons(this.suscribeForEvents);
  };

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
      if(this.state.origin !== undefined && this.state.origin !== null){
        console.log("ORIGIN:" + this.state.origin)
        console.log("STAND:" + location[0])
        this.state.distance = getDistance(this.state.origin,location[0], 0.01);
      }

      this.state.target_stand = stand;
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={true} backgroundColor="#609bd1" translucent={true}/>
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

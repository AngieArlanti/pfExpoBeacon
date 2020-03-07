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
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Snackbar from 'react-native-snackbar';
import NoInternetView from '../components/NoInternetView'

var BeaconManager = require('NativeModules').BeaconManager;

export default class DirectionsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true};
    this.state = { showNoInternet: false};
    this.state = { target_stand: null};
    this.state = { target_location: null};
    this.state.distance = {};
    this.state.startSuscription = null;
    this.state.stopSuscription = null;
    this.state.origin = {};
    this.onRetryPress = this.getLocation.bind(this);
  }

  componentDidMount(){
    //this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getLocation();
    //});
      console.log("didmount DirectionScreen")
  }

  componentWillUnmount() {
    console.log("unmount DirectionScreen");
    this.removeAllSuscriptions();
  }

  getLocationApiCall(beacons) {
    console.log("lalalalalalalaaallalalalalalalalalalal")
    let showLoading = true;
    if(this.state.standsDataSource!==undefined && this.state.standsDataSource.length>1){
      showLoading = false;
    }
    this.setState({
      showNoInternet:false,
      isLoading:showLoading,
    });
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
      this.setState({
        origin : responseJson,
        isLoading: false,
        showNoInternet:false
      }, function(){
        if(this.state.target_stand ===null || this.state.target_stand===undefined){
          let stand = [];
          stand.push(this.props.navigation.state.params.target_stand);
          if (stand!==undefined){
            let location = stand.map(function(stand){
              return {
                longitude : stand.longitude,
                latitude : stand.latitude
                
              }
            });
            if(this.state.origin !== undefined && this.state.origin !== null && !this.state.isLoading){
              console.log("ORIGIN:" + JSON.stringify(this.state.origin));
              console.log("STAND:" + JSON.stringify(location[0]));
              this.state.distance = getDistance(this.state.origin,location[0], 0.01);
              console.log("DISCTANCE: " + this.state.distance);
            }
      
            
            this.setState({target_stand : stand})
          }
        }  
                    }), 
                  
      console.log(this.state.origin);
      })
    .catch((error) => {
      let showNoInternet = true
      if(this.state.standsDataSource!==undefined && this.state.standsDataSource.length>1){
        showNoInternet = false;
        this.showSnackbar();
      }

      this.setState({
        isLoading: false,
        showNoInternet: showNoInternet,
      }, function(){
      });
    });
  };

  showSnackbar(){
    Snackbar.show({
      text: '¡Parece que no hay internet!',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor:'red',
      action: {
        text: 'REINTENTAR',
        textColor: 'white',
        onPress: () => {this.getLocation();},
      },
    });
  }

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
  console.log("removeAllSubscriptions")
  this.removeSuscription(this.state.startSubscription);
  this.removeSuscription(this.state.stopSubscription);
};

  getLocation(){
    startRangingBeacons(this.suscribeForEvents);
  };

render() {
  console.log("render DISCTANCE: " + this.state.distance);
  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={true} backgroundColor="#609bd1" translucent={true}/>
      {
        (this.props.navigation.state.params.target_stand!==undefined && this.state.target_stand!==undefined  && this.state.ditance!==0) && <MapComponentView style={styles.container} stands={this.state.target_stand} target_distance={this.state.distance} mapType={MAP_COMPONENT_VIEW_TYPES.ROUTE} navigation={this.props.navigation} />
      }
      {
        (this.state.isLoading || this.state.isLoading===undefined) &&
        <SkeletonContent
          containerStyle={{flex: 1}}
          isLoading={this.state.isLoading}
          layout={[
                  { key: "card1",position:'absolute', height: 180,width: 220, marginLeft: 20,bottom: 24, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 },
                  { key: "card2",position:'absolute', height: 180,width: 220, marginLeft: 260,bottom: 24, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2  },
                  ]}
        />
      }
      {(this.state.showNoInternet && !this.state.isLoading) &&
        <NoInternetView style={{flex: 1}} onPress={this.onRetryPress}/>
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

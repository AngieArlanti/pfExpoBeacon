import React, {Component} from 'react';
import {View, StyleSheet,ToastAndroid, DeviceEventEmitter, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import StandList from './standList';

var BeaconManager = require('NativeModules').BeaconManager;

export default class SearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { isLoading: true};
        this.state = { isDataAvailable: false};
        this.state = { data: [{}]};
        this.state = { dataSource:[{}]};
    }


componentDidUpdate(prevState){
  if ((prevState.data !== this.state.data) && this.state.data!==undefined) {
       this.getOrderedStands();
  }
}
componentWillUnmount() {
  this.startSubscription.remove();
  this.stopSubscription.remove();
}

getOrderedStands(){
  return fetch('http://10.0.2.2:8080/stands?id='+this.state.data[0].macAddress)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: [responseJson],
      });
    })
    .catch((error) =>{
      console.error(error);
    });
}

    //Beacons

suscribeForEvents() {
    this.startSubscription = DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
      //TODO abrir pantalla con los beacons listados.
      //Podes usar este this.state.isDataAvailable y this.state.data para mostrar lista de beacons en el render().
      /* Vas a recibir esto:
      "beacons":[
           {
              "proximity":"immediate",
              "distance":0.01009895532367115,
              "uuid":"2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
              "major":0,
              "minor":1,
              "rssi":-48,
              "macAddress":"0C:F3:EE:08:FC:DD"
           },
           {
              "proximity":"immediate",
              "distance":0.11185681527500883,
              "uuid":"2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
              "major":0,
              "minor":1,
              "rssi":-49,
              "macAddress":"0C:F3:EE:04:19:21"
           }
      */
      if(data.beacons){
        this.stopRangingBeacons();
        console.log(data);
        ToastAndroid.show("Beacons: " + data.beacons[0].macAddress, ToastAndroid.SHORT);
        this.setState({
          isDataAvailable: true,
          data: data.beacons
        }, function(){
        });
  
      }
    })
  }

  unsuscribeForEvents() {
    this.stopSubscription = DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
      ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
      this.startSubscription.remove();
    })
  }º

    startRangingBeacons() {
        try {
          BeaconManager.startRangingBeacons();
          this.suscribeForEvents();
        } catch (e) {
          console.error(e);
        }
      }
      stopRangingBeacons() {
        this.setState({ isLoading: false});
        try {
          BeaconManager.stopRangingBeacons();
          this.unsuscribeForEvents();
        } catch (e) {
          console.error(e);
        }
      }

    //Rendering and Screen UI events handrlers
    onRangeButtonPress = e =>{
    this.startRangingBeacons();
    this.setState({ isLoading: true});
    }

    render() {
        return(
        <View style={styles.container}>
          <StatusBar hidden = {false} backgroundColor = '#609bd1' translucent = {true}/>
          <View style={styles.top} >
             <Button
                title="Range"
                onPress={this.onRangeButtonPress}
                loading={this.state.isLoading}
             />

            <StandList stands={this.state.dataSource} navigation={this.props.navigation} isLoadingList={this.state.isLoading}/>
          </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
      flex: 1,
      padding: 30,
    },
    bottom: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
});
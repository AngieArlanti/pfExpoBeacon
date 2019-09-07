import React, {Component} from 'react';
import {StyleSheet, Text, View, Switch, requireNativeComponent, ToastAndroid, DeviceEventEmitter} from 'react-native';

var BeaconManager = require('NativeModules').BeaconManager;
const isOnText = "Switch OFF";
const isOffText = "Switch ON";

export default class App extends Component {

constructor(props) {
  super(props);
  this._onStatusChange = this._onStatusChange.bind(this);
  this.state = { isOn: false};
  this.state = { buttonText: isOffText};
  this.state = { isDataAvailable: false};
}

_onStatusChange = e => {
  if(this.state.isOn){
    console.log("stop");
    this.stopRangingBeacons();  
    this.setState({ buttonText: isOffText});
    this.setState({ isOn: false});
  }else {
    console.log("start");
    this.startRangingBeacons();
    this.setState({ buttonText: isOnText});
    this.setState({ isOn: true});
  }
}

startRangingBeacons() {
  try {
    BeaconManager.startRangingBeacons();
    this.suscribeForEvents();
  } catch (e) {
    console.error(e);
  }
}

suscribeForEvents() {
  this.subscription = DeviceEventEmitter.addListener('didRangeBeaconsInRegion', (data) => {
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
    this.state = { isDataAvailable: true};
    this.state = { data: data.beacons};
    ToastAndroid.show("Beacons: " + data.beacons[0].macAddress, ToastAndroid.SHORT);
  })  
}


stopRangingBeacons() {
  try {
    BeaconManager.stopRangingBeacons();
    this.unsuscribeForEvents();
  } catch (e) {
    console.error(e);
  }
}

unsuscribeForEvents() {
  this.subscription.remove();  
}

render() {
 return (
   <View style={styles.container}>
      <View style={styles.top} >
        <Text>Monitor de Beacons esta: </Text>
        <Text>{this.state.isOn ? "Encendido" : "Apagado"}</Text>
        <Switch value={this.state.isOn} onValueChange={this._onStatusChange} />
      </View>
  </View>
);
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F5FCFF',
},
top: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},
bottom: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},
});
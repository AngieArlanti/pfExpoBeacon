var BeaconManager = require('NativeModules').BeaconManager;
import {ToastAndroid} from 'react-native';


const startRangingBeacons = (callback) => {
  ToastAndroid.show("Beacons range started", ToastAndroid.SHORT);
    try {
      BeaconManager.startRangingBeacons();
      callback();
    } catch (e) {
      console.log(e);
      //removeAllSuscriptions();
    }
  };

const stopRangingBeacons = (callback) => {
  ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
    try {
      BeaconManager.stopRangingBeacons();
      callback();
    } catch (e) {
      console.log(e);
      //removeAllSuscriptions();
    }
  };


module.exports = {
  startRangingBeacons, stopRangingBeacons
};

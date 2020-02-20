var BeaconManager = require('NativeModules').BeaconManager;
import {saveDeviceProximity} from '../services/deviceProximityClient';
import {ToastAndroid, DeviceEventEmitter} from 'react-native';

const startRangingBeacons = (callback) => {
  ToastAndroid.show("Beacons range started", ToastAndroid.SHORT);
    try {
      BeaconManager.startRangingBeacons();
      return suscribeForEvents(callback);
    } catch (e) {
      console.error(e);
    }
  };

const stopRangingBeacons = (callback) => {
  ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
    try {
      BeaconManager.stopRangingBeacons();
      return unsuscribeForEvents(callback);
    } catch (e) {
      //TODO this should receive an onFail callback.
      console.error(e);
    }
  };

  
const suscribeForEvents = (callback) => {
    return DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
      if(data.beacons){
        saveDeviceProximity(data.beacons);
        callback(data.beacons);
      }
  })
}

const unsuscribeForEvents = (callback) => {
  return DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
    callback();
  })
}

module.exports = {
  startRangingBeacons, stopRangingBeacons
};
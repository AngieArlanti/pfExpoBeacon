var BeaconManager = require('NativeModules').BeaconManager;
import {ToastAndroid, DeviceEventEmitter} from 'react-native';

let startSuscription = null;
let stopSuscription = null;

const startRangingBeacons = (callback) => {
  ToastAndroid.show("Beacons range started", ToastAndroid.SHORT);
    try {
      BeaconManager.startRangingBeacons();
      startSuscription = suscribeForEvents(callback);
    } catch (e) {
      console.error(e);
      removeAllSuscriptions();
    }
  };

const stopRangingBeacons = () => {
  ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
    try {
      BeaconManager.stopRangingBeacons();
      stopSuscription = unsuscribeForEvents();
      removeSuscription(stopSuscription);
    } catch (e) {
      console.error(e);
      removeAllSuscriptions();
    }
  };
  
const suscribeForEvents = (callback) => {
    return DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
      if(data.beacons){
        callback(data.beacons);
        stopRangingBeacons();
      }
  })
};

const unsuscribeForEvents = () => {
  return DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
     removeSuscription(startSubscription);
  })
};

const removeSuscription = (suscription) => {
  if (suscription!==undefined || suscription!==null){
    suscription.remove();
  }
};

const removeAllSuscriptions = () => {
  removeSuscription(startSubscription);
  removeSuscription(stopSubscription);
};

module.exports = {
  startRangingBeacons, stopRangingBeacons
};
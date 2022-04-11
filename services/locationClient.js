import {DEVICE_PROXIMITY_SERVICE_URL, GET_LOCATION_SERVICE_URL} from '../assets/constants/constants';
import { getUniqueId } from 'react-native-device-info';
import {startRangingBeacons} from '../services/beaconManagerClient';
import { logger, fileAsyncTransport } from "react-native-logs";
import RNFS from "react-native-fs";

const config = {
  transport: fileAsyncTransport,
  transportOptions: {
    FS: RNFS,
    fileName: `testlogfile.csv`,
  },
};
    const getNearbyStands = (beacons) => {
      let log = logger.createLogger(config);
        return beacons.map(function(stand){
          console.log(`${stand.macAddress},${stand.distance}\n`);
          log.debug(`,${stand.macAddress},${stand.distance}\n`); 
          return {
            stand_id : stand.macAddress,
            distance : stand.distance
          }
        });
      };  
    
    const saveDeviceProximity = (beacons) => {
    fetch(DEVICE_PROXIMITY_SERVICE_URL, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        device_id: getUniqueId(),
        nearby_stands: getNearbyStands(beacons)
        }),
    });
    };

    const saveLocation = () => {
      startRangingBeacons(saveDeviceProximity);
    };

    const getLocationApiCall = (beacons) => {
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
        return responseJson
      })
      .catch((error) => {
        console.error(error);
      });
    };

    const getLocation = () => {
      return startRangingBeacons(getLocationApiCall);
    };

module.exports = {
    saveLocation, getLocation, getNearbyStands
};
import {DEVICE_PROXIMITY_SERVICE_URL, GET_LOCATION_SERVICE_URL} from '../assets/constants/constants';
import { getUniqueId } from 'react-native-device-info';
import {startRangingBeacons} from '../services/beaconManagerClient';
    
    const getNearbyStands = (beacons) => {
        return beacons.map(function(stand){
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
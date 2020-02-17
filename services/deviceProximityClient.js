import {DEVICE_PROXIMITY_SERVICE_URL} from '../assets/constants/constants';
import { getUniqueId } from 'react-native-device-info';
    
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

module.exports = {
    saveDeviceProximity
};
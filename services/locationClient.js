import {DEVICE_PROXIMITY_SERVICE_URL} from '../assets/constants/constants';
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

    const getLocation = () => {
      //TODO saveLocation should be inside getLocation in backend.
      saveLocation();

      //TODO call service api call when available.
      //startRangingBeacons(getLocationApiCall);

      //TODO this is fakeLocation Replace it with service when available.
      return  [{
        id: "ldksfjdslkf",
        center: {
          latitude: -34.6403200,
          longitude: -58.401555,
        },
        radius: 1,
      }];
    };

module.exports = {
    saveLocation, getLocation
};
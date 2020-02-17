import {TOURS_NO_LINES_SERVICE_URL, TOURS_TOP_THREE_SERVICE_URL} from '../assets/constants/constants';

const getNoLinesTour = (onSuccess) => {
    return fetch(TOURS_NO_LINES_SERVICE_URL)
    .then((response) => response.json())
    .then((responseJson) => {
      onSuccess(responseJson);
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  const getNext = (beacons) => {
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
    getNoLinesTour
};
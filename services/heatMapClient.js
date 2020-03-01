import {HEAT_MAP_SERVICE_URL} from '../assets/constants/constants';

const getHeatMap = () => {
    return fetch(HEAT_MAP_SERVICE_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
  };

module.exports = {
    getHeatMap
};
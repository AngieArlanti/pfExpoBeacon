import {Dimensions} from 'react-native';

/* ------------------------------------------------
* ------------ COMMON CONSTANTS--------------------
* -------------------------------------------------
*/
export const HEADER_MAX_HEIGHT = 180;
export const HEADER_MIN_HEIGHT = 25;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
// TODO Eliminar cuando conectemos con server real.
// REEMPLACEN POR SU IP SI CORREN EN ANDROID FISICO, LA PUEDEN OBTENER CON: ifconfig | grep "inet " | grep -v 127.0.0.1
// REEMPLAZAR POR 10.0.2.2 SI CORREN EN EMULADOR ANDROID
export const BASE_PATH ='http://10.0.2.2:8080';

/* ------------------------------------------------
* ------------- SERVICES CONSTANS------------------
* -------------------------------------------------
*/
export const DEVICE_PROXIMITY_SERVICE_URL =BASE_PATH+'/device_proximity';
export const STAND_LIST_SERVICE_URL =BASE_PATH+'/stands/list';
export const STAND_RANKING_SERVICE_URL =BASE_PATH+'/stand_ranking';
export const STAND_HISTOGRAM_SERVICE_URL = BASE_PATH+'/stats/stand_histogram?stand_id='

/* ------------------------------------------------
* ----------- MAP COMPONENT CONSTANTS -------------
* -------------------------------------------------
*/
export const { width, height } = Dimensions.get('window');
export const ASPECT_RATIO = width / height;
export const LATITUDE = -34.6403339;
export const LONGITUDE = -58.4015757;
export const LATITUDE_DELTA = 0.000001;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const SPACE = 0.0000001;
export const POLYLINE_DEFAULT_STROKE_WIDTH = 2;
export const POLYLINE_TOUR_DEFAULT_STROKE_WIDTH = 4;
export const MAP_COMPONENT_VIEW_TYPES = {
    TOUR: 'TOUR',
    ROUTE: 'ROUTE',
    DEFAULT: 'DEFAULT'
}
export const  mapProperties= {
    [MAP_COMPONENT_VIEW_TYPES.TOUR] : {
      'showGallery': false,
   	  'showPath': true,
   	  'showUserLocation':false,
      'showOrderMarker':true, },
    [MAP_COMPONENT_VIEW_TYPES.ROUTE]:{
      'showGallery': false,
   	  'showPath': true,
   	  'showUserLocation':true,
      'showOrderMarker':false, },
    [MAP_COMPONENT_VIEW_TYPES.DEFAULT] : {
      'showGallery': true,
   	  'showPath': false,
   	  'showUserLocation':false,
      'showOrderMarker':false, }
};

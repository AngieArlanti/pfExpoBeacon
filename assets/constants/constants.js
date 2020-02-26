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
export const BASE_PATH ='http://192.168.0.28:8080';

/* ------------------------------------------------
* ------------- SERVICES CONSTANS------------------
* -------------------------------------------------
*/
export const DEVICE_PROXIMITY_SERVICE_URL =BASE_PATH + '/device_proximity';
export const STAND_LIST_SERVICE_URL =BASE_PATH + '/stands/list';
export const STAND_RANKING_SERVICE_URL =BASE_PATH + '/stand_ranking';
export const STAND_HISTOGRAM_SERVICE_URL = BASE_PATH + '/stats/stand_histogram?stand_id='
export const TOURS_NO_LINES_SERVICE_URL = BASE_PATH + '/tour/no_lines';
export const TOURS_TOP_THREE_SERVICE_URL = BASE_PATH + '/tour/top_three';

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
      'showOrderMarker':true,
      'showCloseButton':false,
      'showGPSButton':false,
      'showHeatMapButton':false,
      'showDestinationHeader':false,
    },
    [MAP_COMPONENT_VIEW_TYPES.ROUTE]:{
      'showGallery': false,
   	  'showPath': true,
   	  'showUserLocation':true,
      'showOrderMarker':false,
      'showCloseButton':true,
      'showGPSButton':false,
      'showHeatMapButton':false,
      'showDestinationHeader':true,
     },
    [MAP_COMPONENT_VIEW_TYPES.DEFAULT] : {
      'showGallery': true,
   	  'showPath': false,
   	  'showUserLocation':false,
      'showOrderMarker':false,
      'showCloseButton':false,
      'showGPSButton':true,
      'showHeatMapButton':true,
      'showDestinationHeader':false,
    }
};

export const STAND_TOUR_DETAIL_TYPES = {
    MAP_DETAIL: 'MAP_DETAIL',
    TINDER_DETAIL: 'TINDER_DETAIL'
}

export const DEFAULT_MAP_MARKERS_PADDING = { top: 20, right: 40, bottom: 180, left: 40 };

export const HITS = [
  {
    "latitude": -34.64037766315815,
    "longitude": -58.401561985655,
    "weight": 1
  },
  {
    "latitude": -34.640317344029036,
    "longitude": -58.401559175450004,
    "weight": 1
  },
  {
    "latitude": -34.64041036709441,
    "longitude": -58.4016348775547,
    "weight": 1
  },
  {
    "latitude": -34.640432981381544,
    "longitude": -58.40161594121361,
    "weight": 1
  },
  {
    "latitude": -34.64038571949508,
    "longitude": -58.40159418869975,
    "weight": 1
  },
  {
    "latitude": -34.640382986484454,
    "longitude": -58.40156985786718,
    "weight": 1
  },
  {
    "latitude": -34.64038331631962,
    "longitude": -58.401609747911934,
    "weight": 1
  },
  {
    "latitude": -34.64045470051848,
    "longitude": -58.40169296367386,
    "weight": 1
  },
  {
    "latitude": -34.6404542824185,
    "longitude": -58.40166830217771,
    "weight": 1
  },
  {
    "latitude": -34.64041338843318,
    "longitude": -58.401459675641625,
    "weight": 1
  },
  {
    "latitude": -34.640269011957216,
    "longitude": -58.40149434291803,
    "weight": 1
  },
  {
    "latitude": -34.64037201749526,
    "longitude": -58.4015353989331,
    "weight": 1
  },
  {
    "latitude": -34.64031232641879,
    "longitude": -58.401728112064525,
    "weight": 1
  },
  {
    "latitude": -34.64040200814222,
    "longitude": -58.40151267851716,
    "weight": 1
  },
  {
    "latitude": -34.64038627561553,
    "longitude": -58.40156142236102,
    "weight": 1
  },
  {
    "latitude": -34.64042475014479,
    "longitude": -58.401608391694445,
    "weight": 1
  },
  {
    "latitude": -34.6404124554452,
    "longitude": -58.40157324629411,
    "weight": 1
  },
  {
    "latitude": -34.64028480930261,
    "longitude": -58.401587240389084,
    "weight": 1
  },
  {
    "latitude": -34.6403483157672,
    "longitude": -58.40160891375283,
    "weight": 1
  },
  {
    "latitude": -34.64034226241916,
    "longitude": -58.40162765578835,
    "weight": 1
  },
  {
    "latitude": -34.64038405702247,
    "longitude": -58.401492328546425,
    "weight": 1
  },
  {
    "latitude": -34.64032828971199,
    "longitude": -58.40170234222869,
    "weight": 1
  },
  {
    "latitude": -34.64043275714037,
    "longitude": -58.401611784529074,
    "weight": 1
  },
  {
    "latitude": -34.64034438631187,
    "longitude": -58.401603994291314,
    "weight": 1
  },
  {
    "latitude": -34.6404159668263,
    "longitude": -58.4015877850895,
    "weight": 1
  },
  {
    "latitude": -34.64040716453484,
    "longitude": -58.40161595829789,
    "weight": 1
  },
  {
    "latitude": -34.64040916563339,
    "longitude": -58.401455503926584,
    "weight": 1
  },
  {
    "latitude": -34.64028276093749,
    "longitude": -58.40153308539317,
    "weight": 1
  },
  {
    "latitude": -34.64026172609763,
    "longitude": -58.401477940447634,
    "weight": 1
  },
  {
    "latitude": -34.64029512716941,
    "longitude": -58.401513830227735,
    "weight": 1
  },
  {
    "latitude": -34.64040106323467,
    "longitude": -58.401502930610654,
    "weight": 1
  },
  {
    "latitude": -34.64041017515594,
    "longitude": -58.40151225970003,
    "weight": 1
  },
  {
    "latitude": -34.640377074267434,
    "longitude": -58.40158428600619,
    "weight": 1
  },
  {
    "latitude": -34.64041636130297,
    "longitude": -58.40145453444372,
    "weight": 1
  },
  {
    "latitude": -34.640291244707875,
    "longitude": -58.4015661688878,
    "weight": 1
  },
  {
    "latitude": -34.640383696267655,
    "longitude": -58.40157054171016,
    "weight": 1
  },
  {
    "latitude": -34.640390507966,
    "longitude": -58.40147146087031,
    "weight": 1
  },
  {
    "latitude": -34.64031253670786,
    "longitude": -58.401727652284734,
    "weight": 1
  },
  {
    "latitude": -34.64046257881078,
    "longitude": -58.40171733624657,
    "weight": 1
  },
  {
    "latitude": -34.64042693354568,
    "longitude": -58.40169812495427,
    "weight": 1
  },
  {
    "latitude": -34.64029023982178,
    "longitude": -58.40164692842083,
    "weight": 1
  },
  {
    "latitude": -34.64045759420355,
    "longitude": -58.40174137572765,
    "weight": 1
  },
  {
    "latitude": -34.64037857139661,
    "longitude": -58.401623600292965,
    "weight": 1
  },
  {
    "latitude": -34.64033024657711,
    "longitude": -58.40157730188602,
    "weight": 1
  },
  {
    "latitude": -34.640421130441915,
    "longitude": -58.40152603396017,
    "weight": 1
  },
  {
    "latitude": -34.640348318225975,
    "longitude": -58.40159501975288,
    "weight": 1
  },
  {
    "latitude": -34.64039528094439,
    "longitude": -58.40154165037288,
    "weight": 1
  },
  {
    "latitude": -34.64028362899264,
    "longitude": -58.40150723853207,
    "weight": 1
  },
  {
    "latitude": -34.640339971856754,
    "longitude": -58.40157947253463,
    "weight": 1
  },
  {
    "latitude": -34.640405785816625,
    "longitude": -58.4014677007028,
    "weight": 1
  },
  {
    "latitude": -34.64031467382658,
    "longitude": -58.4015388077299,
    "weight": 1
  },
  {
    "latitude": -34.640297726037105,
    "longitude": -58.40160455353601,
    "weight": 1
  },
  {
    "latitude": -34.64039352575041,
    "longitude": -58.401619380926896,
    "weight": 1
  },
  {
    "latitude": -34.64045022867573,
    "longitude": -58.4016452252839,
    "weight": 1
  },
  {
    "latitude": -34.64031900923374,
    "longitude": -58.40163022360884,
    "weight": 1
  },
  {
    "latitude": -34.64041868133816,
    "longitude": -58.40154956670985,
    "weight": 1
  },
  {
    "latitude": -34.640400334559125,
    "longitude": -58.40151240811964,
    "weight": 1
  },
  {
    "latitude": -34.64028957286428,
    "longitude": -58.401524964636,
    "weight": 1
  },
  {
    "latitude": -34.64042898344358,
    "longitude": -58.4015268442061,
    "weight": 1
  },
  {
    "latitude": -34.640284540069636,
    "longitude": -58.4015657940163,
    "weight": 1
  },
  {
    "latitude": -34.64042668528387,
    "longitude": -58.40167207097766,
    "weight": 1
  },
  {
    "latitude": -34.64041075709521,
    "longitude": -58.40145667795627,
    "weight": 1
  },
  {
    "latitude": -34.64039537780408,
    "longitude": -58.40144585422224,
    "weight": 1
  },
  {
    "latitude": -34.64042506045839,
    "longitude": -58.4015132882055,
    "weight": 1
  },
  {
    "latitude": -34.64039233540638,
    "longitude": -58.401461522322634,
    "weight": 1
  },
  {
    "latitude": -34.640296151617456,
    "longitude": -58.40166907838282,
    "weight": 1
  },
  {
    "latitude": -34.64033470584628,
    "longitude": -58.40160489163216,
    "weight": 1
  },
  {
    "latitude": -34.64031237751746,
    "longitude": -58.40169590391957,
    "weight": 1
  },
  {
    "latitude": -34.64038564687387,
    "longitude": -58.40147589455142,
    "weight": 1
  },
  {
    "latitude": -34.640336446539195,
    "longitude": -58.4016336834895,
    "weight": 1
  }
];

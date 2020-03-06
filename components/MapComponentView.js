import React from 'react';
import {View, Text, StyleSheet,ToastAndroid, DeviceEventEmitter, Dimensions, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  Marker,
  AnimatedRegion,
  Polyline,
  Heatmap,
} from 'react-native-maps';
import StandMarker from './StandMarker';
import TourMarker from './TourMarker';
import LocationMarker from './LocationMarker';
import HorizontalCardGallery from './HorizontalCardGallery';
import {HITS,DEFAULT_MAP_MARKERS_PADDING,LATITUDE,LONGITUDE, LATITUDE_DELTA,LONGITUDE_DELTA,POLYLINE_DEFAULT_STROKE_WIDTH,POLYLINE_TOUR_DEFAULT_STROKE_WIDTH,mapProperties, HEAT_MAP_SERVICE_URL, GET_LOCATION_SERVICE_URL} from '../assets/constants/constants'
import {startRangingBeacons, stopRangingBeacons} from '../services/beaconManagerClient';
import { getUniqueId } from 'react-native-device-info';
import {getNearbyStands} from '../services/locationClient';
import Snackbar from 'react-native-snackbar';
import BackgroundTimer from 'react-native-background-timer';

var BeaconManager = require('NativeModules').BeaconManager;

/**
* @param props properties needed to render MapComponentView:
* -

: array of stands' data.
* - mapType: MAP_COMPONENT_VIEW_TYPES that will tell which features of the map does the invoker need to use
* - navigation
*/

export default class MapComponentView extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true};
      this.state = { isDataAvailable: false};
      this.state = { data: [{}]};
      this.state = { standsDataSource:[{}]};
      this.state.markerElements = [];
      this.state.locationMarker =[];
      this.state.polyline =[];
      this.state.polylineStrokeWidth=POLYLINE_DEFAULT_STROKE_WIDTH;
      this.state.standsDataSource= [];
      this.state.markersFitted=false;
      this.state = {
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
        }),
      };
      this.state.showHeatMap = false;
      this.map=null;
      this.markerSelected = null;
      this.state.heatmapWeightedLatLngs = [];
      this.state.layerButtonPressed = false;
      this.state.disableGPSButton = false;

      this.getLocation = this.getLocation.bind(this);
      this.getLocationApiCall = this.getLocationApiCall.bind(this);

      this.state.startSuscription = null;
      this.state.stopSuscription = null;
    }


    componentDidMount() {
      console.log("didmount MapComponentView")
      this._unsubscribe = this.props.navigation.addListener('willBlur', () => {
          if (this.state.layerButtonPressed){
            BackgroundTimer.stopBackgroundTimer();
            this.setState({
              showHeatMap:false,
              layerButtonPressed:false,
              locationMarker:[],
            });
          }
          this.removeAllSuscriptions();
      });

      if(this.props.mapType!==undefined){
        let config =mapProperties[this.props.mapType];
        if(config.showPath && !config.showUserLocation){
          this.showTourRoute();
        }
        if(config.showPath && config.showUserLocation){
          this.locateGuy(true);
        }
      }
      this.setState({ standsDataSource : this.props.stands,
                      mapProps:mapProperties[this.props.mapType]});
    }

    componentWillUnmount() {
      console.log("unmount");
      if(this.state.mapProps.showDestinationHeader){
        this._unsubscribe();
      }
    }

    onRegionChange(region) {
      this.setState({ region });
    }
    get mapType() {
      // MapKit does not support 'none' as a base map
      return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
    }

    //TODO MODULARIZE IN locationClient.js
    getLocationApiCall(beacons) {
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
        this.setState({
          locationMarker:[responseJson],
          disableGPSButton: false,
        });
        this.fitAllMarkers();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          disableGPSButton: false,
        });
      });
    };

  suscribeForEvents = () => {
      this.setState({ startSuscription : DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
        if(data.beacons.length>1){
          stopRangingBeacons(this.unsuscribeForEvents);
          this.getLocationApiCall(data.beacons);
        }
    })
  })
  };
  
  unsuscribeForEvents = () => {
   this.setState({ stopSuscription : DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
       this.removeSuscription(this.state.startSubscription);
    })
  })
  };
  
  removeSuscription = (suscription) => {
    if (suscription!==undefined && suscription!==null){
      suscription.remove();
    }
  };
  
  removeAllSuscriptions = () => {
    this.removeSuscription(this.state.startSubscription);
    this.removeSuscription(this.state.stopSubscription);
  };

    getLocation(){
      startRangingBeacons(this.suscribeForEvents);
    };

   /* BUTTON HANDLERS:
      - onGpsButtonPress
      - onLayersButtonPressed
      - onCloseButtonPress
   */

  //Method executed when pressing location button
  onGpsButtonPress = e => {
    this.setState({
      disableGPSButton: true,
    });
    this.getLocation();
  }

  onDirectionsButtonPress = e =>{
    this.locateGuy(false);
  }

  getHeatMap() {
    return fetch(HEAT_MAP_SERVICE_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          heatmapWeightedLatLngs: responseJson.map(function(location){return {
            latitude: location.latitude,
            longitude: location.longitude,
            weight:1
          }})
        })
      })
      .catch((error) =>{
        this.showSnackbar();
      });
  };

  onLayersButtonPressed = e =>{
    if(!this.state.layerButtonPressed){
        this.setState({
          showHeatMap:true,
          layerButtonPressed:true,
        });
        BackgroundTimer.runBackgroundTimer(() => {
          //code that will be called every 3 seconds
          this.getHeatMap();
      },10000);
    } else {
      BackgroundTimer.stopBackgroundTimer();
      this.setState({
        showHeatMap:false,
        layerButtonPressed:false,
      });
    }
  }

  showSnackbar(){
    Snackbar.show({
      text: '¡Parece que no hay internet!',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor:'red',
      action: {
        text: 'REINTENTAR',
        textColor: 'white',
        onPress: () => {this.onLayersButtonPressed();},
      },
    });
  }

  // On tours tinder screen appears on Route map type to close the full screen map
  onCloseButtonPress(navigation){
   navigation.goBack(null);
  }

  /* LOCATION AND ROUTE RENDERING:
     - onGpsButtonPress
     - onDirectionsButtonPress
  */

  // Locates position of the user and according to bool:renderPath renders (or not) the path to the stands TODO:Proper calculation of location
  locateGuy(renderPath) {
    this.setState({
      locationMarker:this.getLocation(),
    }, function(renderPath){
      if({renderPath}){
        this.fillPolylineDataSource();
      }

    });
  }
  // Polyline needs a datasource to be built, that datasource is an array of lat,long.
  fillPolylineDataSource(){
    let stand = [];
    stand.push(this.props.stands[0]);

    if (this.state.locationMarker!== undefined && this.state.locationMarker.length > 0){
      let location=this.state.locationMarker.map(function(location){return {
        latitude: location.latitude,
        longitude: location.longitude
      }});
      if (stand !== undefined && location !== undefined) {
        this.showRouteToStand(stand, location[0]);
      }
    }
  }

  /*Creates a polyline datasource with all the stands. Assumes stands are ordered
  * @param stand: Destination stand
  * @param currentLocation: user location in this format
      {
        latitude: someLatitude,
        longitude: someLongitude
      }
  */
  showRouteToStand(stands,currentLocation){
    let routePolylineDatasource=stands.map(function(stand) {
      return {
        latitude: stand.latitude,
        longitude: stand.longitude
      }
    });
    routePolylineDatasource.unshift(currentLocation);
    this.setState({
      polyline:routePolylineDatasource,
    }, function(){
    });
  }

  /*Creates a polyline datasource with all the stands. Assumes stands are ordered*/
  showTourRoute(){
    let standsPolylineDatasource=this.props.stands.map(function(stand) {
      return {
        latitude: stand.latitude,
        longitude: stand.longitude
      }
    });
    this.setState({
      polyline:standsPolylineDatasource,
      polylineStrokeWidth:POLYLINE_TOUR_DEFAULT_STROKE_WIDTH,
    }, function(){
    });
  }

  /* MAP BEHAVIOUR */
  fitAllMarkers() {
    if(this.map!==null){
      let coordinates = this.state.markerElements.map(marker => marker.latlng);
      if(this.state.locationMarker !== undefined && this.state.locationMarker.length > 0){
        coordinates.push(this.state.locationMarker[0]);
        this.map.fitToCoordinates(coordinates, {
          edgePadding: DEFAULT_MAP_MARKERS_PADDING,
          animated: true,
        });
        this.animateCamera();
      }else{
        this.map.fitToCoordinates(coordinates, {
          edgePadding: DEFAULT_MAP_MARKERS_PADDING,
          animated: true,
        });
      }
    }
  }

  /* CAMERA MANAGEMENT */

  async setCamera() {
  const camera = await this.map.getCamera();
  // Note that we do not have to pass a full camera object to setCamera().
  // Similar to setState(), we can pass only the properties you like to change.
  this.map.setCamera({
    heading: camera.heading + 10,
  });
}

animateCamera() {
  let lat1 =this.state.locationMarker[0].latitude;
  let lat2 =this.state.standsDataSource[0].latitude;
  let dLon = (this.state.standsDataSource[0].longitude-this.state.locationMarker[0].longitude);
  let y = Math.sin(dLon) * Math.cos(this.state.standsDataSource[0].latitude);
  let x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  let brng =Math.atan2(y, x)* (180/Math.PI);
  brng = (360 - ((brng + 360) % 360));
  this.map.animateCamera({ center:this.state.locationMarker[0],pitch:90,heading:brng,zoom:22 });
}

  /* Rendering */

  render () {
    if(this.state.locationMarker === undefined){
      this.state.locationMarker = [];
    }
    if(this.state.markerElements === undefined && this.props.stands !==undefined && this.props.stands.length>0){
      this.state.markerElements = this.props.stands.map(function(responseJson,index) {
        return {
          id: responseJson.id,
          stand_number: responseJson.stand_number,
          stand_index: index,
          latlng: {
            latitude: responseJson.latitude,
            longitude: responseJson.longitude
          }
        }
      });
    }
    if(this.state.locationMarker === undefined){
      this.state.locationMarker = [];
    }
    if(this.state.polyline === undefined){
      this.state.polyline = [];
    }


  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      minZoomLevel={16}
      maxZoomLevel={22}
      rotateEnabled={false}
      toolbarEnabled={false}
      showCompass={false}
      ref={ref => {
            this.map = ref;
          }}
      onMapReady={() => this.fitAllMarkers()}
      initialCamera={{
            center: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
            },
            pitch: 45,
            heading: 90,
            altitude: 1000,
            zoom: 10,
          }}
      >
      {
        (this.state.heatmapWeightedLatLngs !== undefined && this.state.heatmapWeightedLatLngs.length !== 0 && this.state.showHeatMap) &&
        <Heatmap points={this.state.heatmapWeightedLatLngs} radius={10} />
      }
      {
        this.state.markerElements.map(marker => {
          return (
            <Marker
            key={marker.id}
            onPress={() => this.setState({ markerSelected:marker.stand_index})}
            coordinate={marker.latlng}
            style={styles.standMarkerStyle}
            calloutAnchor={{ x: 0, y: 0 }}
            anchor={{ x: 0.5, y: 0.5 }}
            >
            {(this.state.mapProps !==undefined && this.state.mapProps.showOrderMarker)?<TourMarker order={marker.stand_index+1}/>:<StandMarker standId={marker.stand_number+100} selected={this.state.markerSelected===marker.stand_index}/>}
            </Marker>
          );
        })
      }
      {
        this.state.locationMarker.map(loc=>{
          return (
            <Marker
            key={"Location"}
            coordinate={loc}
            style={styles.locationMarkerStyle}
            calloutAnchor={{ x: 0, y: 0 }}
            anchor={{ x: 0.5, y: 0.5 }}
            >
            <LocationMarker/>
            </Marker>
          );
        })
      }

      <Polyline
        coordinates={this.state.polyline}
        strokeColor="#609bd1"
        strokeWidth={this.state.polylineStrokeWidth}
      />
      </MapView>
      {(this.state.mapProps !==undefined && this.state.mapProps.showCloseButton) &&
        <TouchableOpacity style={{flex:1,alignSelf:'flex-start',top: 16,left:16,position: 'absolute'}} onPress={() =>this.onCloseButtonPress(this.props.navigation)}>
          <Icon color="black" name={"close"} size={24}/>
        </TouchableOpacity>
      }
      {(this.state.mapProps !==undefined && this.state.mapProps.showDestinationHeader) &&
        <View style={{flex:1,alignSelf:'flex-start',top:48,left:16,right: 8,borderRadius: 6,position: 'absolute',flexDirection: 'row', backgroundColor: 'green',padding: 16,justifyContent:'center'}}>
          <View style={{flex:1,flexDirection: 'column',alignContent: 'center'}}>
            <Icon color="white" name={"arrow-upward"} size={24}/>
            <View style={{flex:1,marginTop: 8,flexDirection: 'row',alignContent: 'flex-end',justifyContent: 'center'}}>
              <Text style={{fontSize: 20,color: '#FFFFFF'}}>{this.props.target_distance}</Text>
              <Text style={{fontSize: 16,color: '#FFFFFF',alignSelf: 'flex-end'}}> m</Text>
            </View>
          </View>
          <View style={{flex:4,alignSelf: 'center'}}>
            <Text style={styles.directionsHeaderLabel}>Dirígete hacia {this.props.stands[0].title}</Text>
          </View>
        </View>
      }
      <View style={styles.bottom}>
        {(this.state.mapProps !==undefined && this.state.mapProps.showHeatMapButton && !this.state.layerButtonPressed) &&
          <TouchableOpacity style={styles.layersButton} onPress={this.onLayersButtonPressed}>
            <Icon name={"layers"} size={20} color="black" />
          </TouchableOpacity>
        }
        {(this.state.mapProps !==undefined && this.state.mapProps.showHeatMapButton && this.state.layerButtonPressed) &&
          <TouchableOpacity style={styles.layersButton} onPress={this.onLayersButtonPressed}>
            <Icon name={'layers-clear'} size={20} color="black" />
          </TouchableOpacity>
        }
        {(this.state.mapProps !==undefined && this.state.mapProps.showGPSButton) &&
          <TouchableOpacity style={styles.gpsButton} onPress={this.onGpsButtonPress} disable={this.state.disableGPSButton}>
            <Icon name={"gps-fixed"} size={20} color="black" />
          </TouchableOpacity>
        }
        {(this.state.mapProps !==undefined && this.state.mapProps.showGallery) &&
          <HorizontalCardGallery
            style={styles.cardGallery}
            stands={this.state.standsDataSource}
            indexSelected={this.state.markerSelected}
            navigation={this.props.navigation}
          />
        }
      </View>
    </View>

  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  cardGallery:{
    position: 'absolute',
    bottom:0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  gpsButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:50,
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginRight: 8,
  },
  layersButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:50,
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginRight: 8,
  },
  standMarkerStyle:{
    position: 'absolute',
    zIndex: 0,
  },
  locationMarkerStyle:{
    position: 'absolute',
    zIndex: 1,
  },
  directionsHeaderLabel: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

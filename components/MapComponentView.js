import React, {Component} from 'react';
import {View, Text, StyleSheet,ToastAndroid, DeviceEventEmitter,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import {Button, Header, Icon} from 'react-native-elements';
import StandList from '../standList';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  ProviderPropType,
  UrlTile,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import StandMarker from './StandMarker';
import TourMarker from './TourMarker';
import LocationMarker from './LocationMarker';
import HorizontalCardGallery from './HorizontalCardGallery';
import StyleCommons from '../assets/styles/StyleCommons';
import {saveDeviceProximity} from '../services/deviceProximityClient';
import {ASPECT_RATIO,LATITUDE,LONGITUDE, LATITUDE_DELTA,LONGITUDE_DELTA,SPACE,POLYLINE_DEFAULT_STROKE_WIDTH,POLYLINE_TOUR_DEFAULT_STROKE_WIDTH,DEVICE_PROXIMITY_SERVICE_UR,MAP_COMPONENT_VIEW_TYPES,mapProperties} from '../assets/constants/constants'
var BeaconManager = require('NativeModules').BeaconManager;
const { width, height } = Dimensions.get('window');



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
      this.state = {
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
        }),
      };
    }

    componentDidMount() {
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
      if( this.startSubscription !==undefined && this.stopSubscription!==undefined){
        this.startSubscription.remove();
        this.stopSubscription.remove();
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


    //Beacons
    suscribeForEvents() {
      this.startSubscription = DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGED, (data) => {
        //TODO abrir pantalla con los beacons listados.
        //Podes usar este this.state.isDataAvailable y this.state.data para mostrar lista de beacons en el render().
        /* Vas a recibir esto:
        "beacons":[
        {
        "proximity":"immediate",
        "distance":0.01009895532367115,
        "uuid":"2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
        "major":0,
        "minor":1,
        "rssi":-48,
        "macAddress":"0C:F3:EE:08:FC:DD"
      },
      {
      "proximity":"immediate",
      "distance":0.11185681527500883,
      "uuid":"2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
      "major":0,
      "minor":1,
      "rssi":-49,
      "macAddress":"0C:F3:EE:04:19:21"
    }
    */
    if(data.beacons){
      this.stopRangingBeacons();
      console.log(data);
      saveDeviceProximity(data.beacons);
      this.setState({
        isDataAvailable: true,
        data: data.beacons
      }, function(){
      });

    }
  })
  }

  unsuscribeForEvents() {
    this.stopSubscription = DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
      ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
      if (this.startSubscription!==undefined){
        this.startSubscription.remove();
      }
    })
  }

  startRangingBeacons() {
    try {
      BeaconManager.startRangingBeacons();
      this.suscribeForEvents();
    } catch (e) {
      console.error(e);
    }
  }

  stopRangingBeacons() {
    this.setState({ isLoading: false});
    try {
      BeaconManager.stopRangingBeacons();
      this.unsuscribeForEvents();
    } catch (e) {
      console.error(e);
    }
  }

   /* BUTTON HANDLERS:
      - onGpsButtonPress
      - onDirectionsButtonPress
   */

  //Rendering and Screen UI events handlers
  onRangeButtonPress = e =>{
    this.startRangingBeacons();
    this.setState({ isLoading: true});
  }

  //Method executed when pressing location button
  onGpsButtonPress = e =>{
    this.startRangingBeacons();
    var fakeLocation =  [{
      id: "ldksfjdslkf",
      center: {
        latitude: -34.6403200,
        longitude: -58.401555,
      },
      radius: 1,
    }];
    this.setState({
      locationMarker:fakeLocation,
    });
  }

  //Rendering and Screen UI events handrlers
  onDirectionsButtonPress = e =>{
    this.locateGuy(true);
  }

  /* LOCATION AND ROUTE RENDERING:
     - onGpsButtonPress
     - onDirectionsButtonPress
  */
  locateGuy(renderPath) {
    var fakeLocation =  [{
      id: "ldksfjdslkf",
      center: {
        latitude: -34.6403200,
        longitude: -58.401555,
      },
      radius: 1,
    }];
    console.log({renderPath});
    this.setState({
      locationMarker:fakeLocation,
    }, function(renderPath){
      console.log(renderPath);
      if({renderPath}){
        this.fillPolylineDataSource();
      }

    });
  }

  fillPolylineDataSource(){
    let stand = [];
    stand.push(this.props.stands[7]);
    console.log("fillPolylineDataSource");

    if (this.state.locationMarker!== undefined && this.state.locationMarker.length > 0){
      let location=this.state.locationMarker.map(function(location){return {
        latitude: location.center.latitude,
        longitude: location.center.longitude
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
      minZoomLevel={17}
      maxZoomLevel={22}
      rotateEnabled={false}
      >
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
            {(this.state.mapProps !==undefined && this.state.mapProps.showOrderMarker)?<TourMarker order={marker.stand_index+1}/>:<StandMarker standId={marker.stand_number+100}/>}
            </Marker>
          );
        })
      }
      {/*
        this.props.stands !== undefined && this.props.stands.map((stand,index) => {
          return (
            <Marker
            key={stand.id}
            onPress={() => this.setState({ markerSelected:index})}
            coordinate= {{latitude:stand.latitude,longitude:stand.longitude}}
            style={styles.standMarkerStyle}
            calloutAnchor={{ x: 0, y: 0 }}
            anchor={{ x: 0.5, y: 0.5 }}
            >
            <StandMarker standId={stand.stand_number+100}/>
            </Marker>
          );
        }))*/
      }
      {
        this.state.locationMarker.map(loc=>{
          return (
            <Marker
            key={loc.id}
            coordinate={loc.center}
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

      <View style={styles.bottom}>
      <TouchableOpacity style={styles.gpsButton} onPress={this.onGpsButtonPress}>
        <Icon name={"gps-fixed"}  size={20} color="black" />
      </TouchableOpacity>
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
  standMarkerStyle:{
    position: 'absolute',
    zIndex: 0,
  },
  locationMarkerStyle:{
    position: 'absolute',
    zIndex: 1,
  }
});

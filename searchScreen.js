import React, {Component} from 'react';
import {View, Text, StyleSheet,ToastAndroid, DeviceEventEmitter,ScrollView, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import {Button,Header} from 'react-native-elements';
import StandList from './standList';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  ProviderPropType,
  UrlTile,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import StandMarker from './components/StandMarker'
import HorizontalCardGallery from './components/HorizontalCardGallery';

var BeaconManager = require('NativeModules').BeaconManager;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -34.6403339;
const LONGITUDE = -58.4015757;
const LATITUDE_DELTA = 0.000001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.0000001;


export default class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true};
    this.state = { isDataAvailable: false};
    this.state = { data: [{}]};
    this.state = { dataSource:[{}]};
    this.state.markerElements =[];
    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }

  componentWillUnmount() {
    this.startSubscription.remove();
    this.stopSubscription.remove();
  }

  // Lifecycle events
  componentDidMount(){
    this.getAllStands();
  }

  // TODO Eliminar cuando conectemos con server real.
  // REEMPLACEN POR SU IP SI CORREN EN ANDROID FISICO, LA PUEDEN OBTENER CON: ifconfig | grep "inet " | grep -v 127.0.0.1
  // REEMPLAZAR POR 10.0.2.2 SI CORREN EN EMULADOR ANDROID
  // Services TODO: Modularize
  getAllStands(){
    return fetch('http://10.0.2.2:8080/stands/list')
      .then((response) => response.json())
      .then((responseJson) => {
      var markerElementMap = responseJson.map(function(responseJson) {
          return {
            id: responseJson.id,
            latlng: {
            latitude: responseJson.latitude,
            longitude: responseJson.longitude
            }
          }
        });
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          markerElements:markerElementMap,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  getOrderedStands(){
    return fetch('http://10.0.2.2:8080/stands?id='+this.state.data[0].macAddress)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
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
    ToastAndroid.show("Beacons: " + data.beacons[0].macAddress, ToastAndroid.SHORT);
    this.setState({
      isDataAvailable: true,
      data: data.beacons
    }, function(){
    });

  }
})
}
get mapType() {
  // MapKit does not support 'none' as a base map
  return this.props.provider === PROVIDER_DEFAULT
  ? MAP_TYPES.STANDARD
  : MAP_TYPES.NONE;
}


unsuscribeForEvents() {
  this.stopSubscription = DeviceEventEmitter.addListener(BeaconManager.EVENT_BEACONS_RANGE_STOPPED, () => {
    ToastAndroid.show("Beacons range stopped", ToastAndroid.SHORT);
    this.startSubscription.remove();
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

//Rendering and Screen UI events handrlers
onRangeButtonPress = e =>{
  this.startRangingBeacons();
  this.setState({ isLoading: true});
}

render() {
  if(this.state.markerElements === undefined){
    this.state.markerElements = [];
  }
  return (
    <View style={styles.container}>
    <StatusBar hidden={false} backgroundColor="#609bd1" translucent={true}/>
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
          onPress={() => this.setState({ markerSelected:marker.id})}
          coordinate={marker.latlng}
          >
            <StandMarker standId={marker.id}/>
          </Marker>
        );
      })
    }
    </MapView>

    <View style={styles.bottom}>
      <HorizontalCardGallery
      style={styles.cardGallery}
      stands={this.state.dataSource}
      selected={this.state.markerSelected}
      navigation={this.props.navigation}
      />
    </View>
    </View>
  );
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
});

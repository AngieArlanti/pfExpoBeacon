import React, {Component} from 'react';
import {View, Text, StyleSheet,ToastAndroid, DeviceEventEmitter,ScrollView, Dimensions, TouchableOpacity} from 'react-native';
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
import Card from './components/Card'
import StandMarker from './components/StandMarker'

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
    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }


  componentDidUpdate(prevState){
    if ((prevState.data !== this.state.data) && this.state.data!==undefined) {
      this.getOrderedStands();
    }
  }
  componentWillUnmount() {
    this.startSubscription.remove();
    this.stopSubscription.remove();
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  getOrderedStands(){
    return fetch('http://private-f63ff-standsv1.apiary-mock.com/stands/'+this.state.data[0].macAddress)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
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
    console.log(data);
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
  var pathTemplate= "/storage/emulated/0/maps/{z}/{x}/{y}.png"
  //"./tiles/{z}/{x}/{y}.png"
  return (
    <View style={styles.container}>
    <MapView
    style={styles.map}
    region={{
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
    minZoomLevel={17}
    maxZoomLevel={20}
    rotateEnabled={false}
    >
    <Marker
    onPress={() => this.setState({ marker1: !this.state.marker1 })}
    coordinate={{
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    }}
    centerOffset={{ x: -18, y: -60 }}
    anchor={{ x: 0.69, y: 1 }}
    >
    <StandMarker standId={123}/>
    </Marker>
    <Marker
    onPress={() => this.setState({ marker1: !this.state.marker1 })}
    coordinate={{
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    }}
    centerOffset={{ x: -15, y: -15 }}
    anchor={{ x: 0.1, y: 0.2 }}
    >
    <StandMarker standId={212}/>
    </Marker>
    <UrlTile urlTemplate={pathTemplate} tileSize={256} zIndex={1} />
    </MapView>

    <View style={{height: 130, marginBottom: 40 }}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998258-f9599f80-088e-11ea-931c-86f192479939.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998284-32920f80-088f-11ea-86aa-648135b7d262.jpg" title="Auto Fórmula SAE" distance="Estás a 24 m" nextEvent="Próxima actividad en 33 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998312-7dac2280-088f-11ea-82b7-975f253f9cdc.jpg" title="Synthetic voice harmonization" distance="Estás a 43m" nextEvent="No hay actividades programadas"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998234-83553880-088e-11ea-8763-b01236188de6.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998440-358dff80-0891-11ea-9055-3e416cfc00b3.jpeg'" title="Auto Fórmula SAE" distance="Estás a 24 m" nextEvent="Próxima actividad en 33 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998441-36269600-0891-11ea-8cc7-bc9a7172be82.jpeg');" title="Synthetic voice harmonization" distance="Estás a 43m" nextEvent="No hay actividades programadas"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998442-36269600-0891-11ea-956c-17edb33f4651.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998444-36269600-0891-11ea-8cc5-c0263263fd8f.jpeg" title="Auto Fórmula SAE" distance="Estás a 24 m" nextEvent="Próxima actividad en 33 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998445-36269600-0891-11ea-9747-12d2401e441d.jpg" title="Synthetic voice harmonization" distance="Estás a 43m" nextEvent="No hay actividades programadas"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998446-36bf2c80-0891-11ea-8448-d6cf724d30cb.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998629-c239bd00-0893-11ea-9f84-9cf179282c6d.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="ttps://user-images.githubusercontent.com/7771294/68998630-c2d25380-0893-11ea-9a90-967494e0fa8d.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998631-c2d25380-0893-11ea-8a97-7d1ecf182caf.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998767-522c3680-0895-11ea-92ee-695cc8f8be5f.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998766-522c3680-0895-11ea-8246-c929374925e3.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998768-52c4cd00-0895-11ea-9851-24ec2a3e31ad.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998806-cbc42480-0895-11ea-9c96-c468c3359a8f.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998873-adaaf400-0896-11ea-9fb7-420463365810.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998872-adaaf400-0896-11ea-8ccf-2a7efb2b476e.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998870-adaaf400-0896-11ea-89ca-0a35dc0a5135.jpg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    <Card imageUri="https://user-images.githubusercontent.com/7771294/68998869-adaaf400-0896-11ea-9608-26bf23632411.jpeg" title="Combot" distance="Estás a 7,5 m" nextEvent="Próxima actividad en 16 minutos"/>
    </ScrollView>
    </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

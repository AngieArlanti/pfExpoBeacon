  import React, {Component} from 'react';
  import {View, Text, StyleSheet,ToastAndroid, DeviceEventEmitter,ScrollView} from 'react-native';
  import {Button,Header} from 'react-native-elements';
  import StandList from './standList';
  import MapView, {  MAP_TYPES,
  PROVIDER_DEFAULT,
  LocalTile,
  ProviderPropType, } from 'react-native-maps';
  import Card from './components/Card'

  var BeaconManager = require('NativeModules').BeaconManager;

  export default class SearchScreen extends React.Component {

      constructor(props) {
          super(props);
          this.state = { isLoading: true};
          this.state = { isDataAvailable: false};
          this.state = { data: [{}]};
          this.state = { dataSource:[{}]};
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
        return (
          <View style={styles.container}>
            <MapView
              ref={(ref)=> this.mapRef = ref}
              provider={this.props.provider}// remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: -34.6403339,
                longitude: -58.4015757,
                latitudeDelta: 0.00000001,
                longitudeDelta: 0.00000001,
              }}
              minZoomLevel={17}
              maxZoomLevel={20}
              rotateEnabled={false}
            >
            <LocalTile
              pathTemplate="./tiles/{z}/{x}/{y}.png"
              tileSize={256}
              zIndex={-1}
            />
            </MapView>
            <View style={{height: 130, marginBottom: 40 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Card imageUri="https://www.marketingdirecto.com/wp-content/uploads/2019/03/stand.jpg" name="Home"/>
                <Card imageUri="https://i.pinimg.com/originals/f0/49/06/f04906f1d079f8113e534345e44133a7.jpg" name="Experiences"/>
                <Card imageUri="https://dextailstands.com/wp-content/uploads/2019/11/Hispack_Zedis_1.jpg" name="Resturant"/>
              </ScrollView>
            </View>
          </View>
        );
      }
  }


  const styles = StyleSheet.create({
    container: {
     ...StyleSheet.absoluteFillObject,
     flex: 1,
     width: 400,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },
  });

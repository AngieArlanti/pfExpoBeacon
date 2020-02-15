import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar,
ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Constants from '../assets/constants/constants'
import MapComponentView from '../components/MapComponentView';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from '../assets/constants/constants';
import Tts from 'react-native-tts';


export default class StandTourDetailsSwipeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true};
    this.state = { isDataAvailable: false};
    this.state = { data: [{}]};
    this.state = { standsDataSource:[{}]};
  }


  // Lifecycle events
  componentDidMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAllStands();
    });
  }

  // Services TODO: Modularize
  getAllStands(){
    return fetch(STAND_LIST_SERVICE_URL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        standsDataSource: responseJson,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

onPlayButtonPress(){
  Tts.engines().then(engines => console.log(engines));

  Tts.getInitStatus().then(() => {
  Tts.setDefaultLanguage('es-ES');
  Tts.setDefaultRate(0.4);
  Tts.speak('El que no hace palmas es un rati');
});
}
onCloseButtonPress(){
  this.props.navigation.goBack(null);
}

render() {

  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={false} backgroundColor="#609bd1" translucent={true}/>
      {
        (this.state.standsDataSource.length!==1) &&
            <ImageBackground source={{uri:this.state.standsDataSource[Math.floor(Math.random() * this.state.standsDataSource.length) + 1 ].cover}}
                style={{ flex: 1, resizeMode: 'cover',flexDirection: 'row',justifyContent:'center', backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <TouchableOpacity style={{flex:1,alignSelf:'flex-start',top: 26,left:8,position: 'absolute',backgroundColor: 'red'}} onPress={this.onCloseButtonPress}>
                  <Icon color="black" name={"close"} size={20}/>
                </TouchableOpacity>
                <View style={styles.containerWithColor}>
                    <View style={{flex:1,flexDirection: 'column',marginBottom: 32,backgroundColor: 'red'}}>
                      <Icon color="black" name={"directions-walk"} size={64}/>
                      <Text style={styles.directionsButtonLabel}>Camina 25 metros hasta el stand {this.state.standsDataSource.stand_number+100}</Text>
                    </View>
                    <View style={{flex:1,flexDirection: 'row',height: 60,backgroundColor: 'yellow',marginVertical: 16}}>
                      <TouchableOpacity style={styles.buttonStyle} onPress={this.onForwardButtonPress}>
                        <Icon reverse color="black" name={"forward-10"} size={28}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle} onPress={this.onPlayButtonPress}>
                        <Icon reverse color="black" name={"play-arrow"} size={52}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle} onPress={this.onReplayButtonPress}>
                        <Icon reverse color="black" name={"replay-10"} size={28}/>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.directionsButton}>
                      <Icon color="white" name={"directions"} size={18}/>
                      <Text style={styles.directionsButtonLabel}>Indicaciones</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  <TouchableOpacity style={styles.nextButton} onPress= {() => this.props.navigation.navigate('StandTourDetailsSwipeScreen', {sties : this.state.standsDataSource })}>
                    <Icon color="black" name={"chevron-right"} size={28}/>
                  </TouchableOpacity>
                </View>
            </ImageBackground>
      }
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWithColor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: 'orange'
  },
  buttonStyle:{
    height: 52,
    justifyContent: 'center'
  },
  backgroudOverlay:{
    flex:1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff'
  },
  nextButton: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width:36,
    backgroundColor:'yellow',
  },
  directionsButton:{
    backgroundColor:'#000000',
    flex: 1,
    borderRadius: 2,
    padding: 6,
    marginVertical: 16,
  },
  directionsButtonLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingLeft:8,
  },
  directionsLabel: {
    color: '#000000',
    fontSize: 36,
    alignSelf: 'center',
  },
  });

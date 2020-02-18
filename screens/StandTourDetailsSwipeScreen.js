import React, {Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, TouchableOpacity,StatusBar,
ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Constants from '../assets/constants/constants'
import DirectionsScreen from './DirectionsScreen';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from '../assets/constants/constants';
import Tts from 'react-native-tts';
//import {getNoLinesTour} from '../services/toursClient';
import {TOURS_NO_LINES_SERVICE_URL, TOURS_TOP_THREE_SERVICE_URL} from '../assets/constants/constants';


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
    StatusBar.setHidden(true);
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getNoLinesTour();
    });
  }

  //////////////////
  //TODO TOUR SERVICES - Modularize
  
  getNoLinesTour(){
    return fetch(TOURS_NO_LINES_SERVICE_URL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.onTourFetched(responseJson.tour);
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  getNextBestStand(currentStand, pendingStands, callback) {
    fetch(TOURS_NO_LINES_SERVICE_URL, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        current_stand: currentStand,
        pending_stands: pendingStands
        }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        standsDataSource: responseJson.tour,
      }, function(){
      });
      callback(responseJson.tour);
    })
    .catch((error) =>{
      console.error(error);
    });
    };

  onTourFetched(data) {
    this.setState({
      isLoading: false,
      standsDataSource: data,
    }, function(){
    });
  }

  //////////////////

  onPlayButtonPress(stand){
    Tts.engines().then(engines => console.log(stand));
    Tts.getInitStatus().then(() => {
    Tts.setDefaultLanguage('es-AR');
    Tts.setDefaultRate(0.5);
    Tts.speak(stand.short_description);
  });
  }

  onCloseButtonPress(navigation){
   navigation.goBack(null);
  }

  onNextBestStand() {
    if(this.state.standsDataSource.size !== 1){
      var pendingStands = [...this.state.standsDataSource];
      var currentStand = pendingStands.splice(0, 1);
      this.getNextBestStand(currentStand[0],
         pendingStands, 
         (data) => {this.props.navigation.navigate('StandTourDetailsSwipeScreen', {sties : data })});
    } else {
      //TODO show finish screen!! Now next button does nothing here.
    }
  }

render() {

  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={false} backgroundColor="#609bd1" translucent={true}/>
      {(this.state.standsDataSource !== undefined && this.state.standsDataSource[0] !== undefined) &&
            <ImageBackground source={{uri:this.state.standsDataSource[0].cover}}
                style={{ flex: 1, resizeMode: 'cover'}}>
                <View style={styles.overlay}>
                  <TouchableOpacity style={{flex:1,alignSelf:'flex-start',top: 24,left:16,position: 'absolute'}} onPress={() =>this.onCloseButtonPress(this.props.navigation)}>
                    <Icon color="white" name={"close"} size={24}/>
                  </TouchableOpacity>
                  <View style={styles.controllersContainer}>
                      <View style={{flex:1,width: 220}}>
                        <Icon color="white" name={"directions-walk"} size={72}/>
                        <Text style={styles.directionsLabel}>Camina 25 metros hasta el stand {this.state.standsDataSource[0].stand_number+100}</Text>
                      </View>
                      <View style={{flex:1,flexDirection: 'row',height: 60,marginTop: 32, alignItems: 'center',alignSelf: 'center',position: 'absolute'}}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() =>this.onForwardButtonPress}>
                          <Icon reverse color='rgba(0,0,0,0.7)' name={"forward-10"} size={28}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() =>this.onPlayButtonPress(this.state.standsDataSource[0])}>
                          <Icon reverse color='rgba(0,0,0,0.7)' name={"play-arrow"} size={52}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() =>this.onReplayButtonPress}>
                          <Icon reverse color='rgba(0,0,0,0.7)' name={"replay-10"} size={28}/>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.directionsButton} onPress= {() => this.props.navigation.navigate('DirectionsScreen', {
                        target_stand:this.state.standsDataSource[0]})}>
                        <Icon color="white" name={"directions"} size={14}/>
                        <Text style={styles.directionsButtonLabel}>Indicaciones</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.container}>
                    <TouchableOpacity style={styles.nextButton} onPress= {() => this.onNextBestStand()}>
                      <Icon color="white" name={"chevron-right"} size={28}/>
                    </TouchableOpacity>
                  </View>
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
  controllersContainer: {
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute'
  },
  buttonStyle:{
    height: 52,
    justifyContent: 'center'
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
    //backgroundColor:'rgba(255,255,255,0.15)',
  },
  directionsButton:{
    backgroundColor:'rgba(0,0,0,0.4)',
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 32,
    marginTop: 300,
    alignSelf:'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  directionsButtonLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingLeft:8,
    alignSelf: 'center'
  },
  directionsLabel: {
    color: 'white',
    fontSize: 28,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    flex:1,
    flexDirection: 'row',
    backgroundColor:'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems:'center',
  }
  });

import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet} from 'react-native';
import * as Constants from '../assets/constants/constants';
import {Icon} from 'react-native-elements';

export default class TourFinishedCongratsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar style={styles.container} hidden={true} backgroundColor="#609bd1" translucent={true}/>
      <ImageBackground source={require('../assets/images/exit-itba.jpg')}
        style={{ flex: 1, resizeMode: 'cover'}}>
        <View style={styles.overlay}>
          <View style={styles.messageContainer}>
            <View style={{flex:1,flexDirection: 'column',justifyContent: 'flex-start',alignItems: 'center',marginTop: 60}}>
              <Icon reverse color="white" reverseColor="green" name={"check"} size={48} style={styles.iconStyle}/>
              <Text style={styles.congratsTitle}> ¡Felicitaciones!</Text>
              <Text style={styles.congratsSubtitle}> Ya recorriste toda la expo</Text>
            </View>
          </View>
          <View style={styles.backButtonContainter}>
            <TouchableOpacity style={styles.directionsButton} onPress= {() => this.props.navigation.popToTop()}>
              <Text style={styles.directionsButtonLabel}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex:1,
    flexDirection: 'column',
    backgroundColor:'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems:'center',
  },
  messageContainer: {
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  backButtonContainter: {
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginTop: 64,
  },
  iconStyle:{
    alignSelf: 'center',
  },
  directionsButton:{
    backgroundColor:'rgba(0,0,0,0.4)',
    borderRadius: 4,
    padding: 8,
    height: 40,
    alignSelf:'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  directionsButtonLabel: {
    color: '#FFFFFF',
    fontSize: 24,
    alignSelf: 'center'
  },
  congratsTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  congratsSubtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

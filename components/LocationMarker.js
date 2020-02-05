import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';


class LocationMarker extends React.Component {
  render() {
    const { fontSize, standId } = this.props;
    return (
      <View style={styles.locationIconRound}>
        <View style={styles.locationIcon}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationIcon: {
      borderWidth:1.5,
      borderColor:'#fff',
      width:12,
      height:12,
      backgroundColor:'rgba(70,121,246,1)',
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      zIndex: 11,
      position: 'absolute',
  },
  locationIconRound: {
      borderWidth:1,
      borderColor:'rgba(70,121,246,1)',
      width:24,
      height:24,
      backgroundColor:'rgba(70,121,246,0.4)',
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      zIndex: 11,
      position: 'absolute',
  },
});

export default LocationMarker;

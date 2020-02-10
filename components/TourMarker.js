import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';


class TourMarker extends React.Component {
  render() {
    const standOrder = this.props.order;
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.tourOrderLabel}>{standOrder}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    zIndex: 9,
    position: 'absolute',
  },
  circle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor:'#00558B',
    padding:1,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.75,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  tourOrderLabel: {
    color: '#00558B',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default TourMarker;

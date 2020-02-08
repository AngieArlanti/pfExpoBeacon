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

TourMarker.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
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
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.25,
  },
  tourOrderLabel: {
    color: '#00558B',
    fontSize: 12,
  },
});

export default TourMarker;

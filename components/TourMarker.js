import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const propTypes = {
  standId: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class TourMarker extends React.Component {
  render() {
    const { fontSize, standId } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.standIdLabel, { fontSize }]}>{standId}</Text>
        </View>
      </View>
    );
  }
}

TourMarker.propTypes = propTypes;
TourMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    zIndex: 9,
    position: 'absolute',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#00558B',
    padding: 2,
    borderRadius: 3,
    borderColor: '#004572',
    borderWidth: 0.5,
  },
  standIdLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});

export default TourMarker;

import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Text,Animated } from 'react-native';

const propTypes = {
  standId: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  selected: PropTypes.bool.isRequired
};

const defaultProps = {
  fontSize: 13,
};

class StandMarker extends React.Component {
  render() {
    const { fontSize, standId,selected } = this.props;
    return (
      <View style={styles.container}>
      {selected?
        (<View style={styles.container}>
          <View style={styles.selectedMarkerContainer}>
            <Text style={[styles.standIdLabelSelected , { fontSize }]}>{standId}</Text>
          </View>
          <View style={styles.arrowBorder}/>
          <View style={styles.arrow} />
        </View>
        )
        :(<View style={styles.markerContainer}>
            <Text style={[styles.standIdLabel, { fontSize }]}>{standId}</Text>
          </View>
        )
      }
      </View>
    );
  }
}

StandMarker.propTypes = propTypes;
StandMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    zIndex: 9,
    position: 'absolute',
  },
  markerContainer: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#00558B',
    padding: 2,
    borderRadius: 3,
    borderColor: '#004572',
    borderWidth: 0.5,
  },
  selectedMarkerContainer:{
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 3,
    borderColor: '#004572',
    borderWidth: 0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -10,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#004572',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  standIdLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  standIdLabelSelected: {
    color: '#00558B',
    fontSize: 13,
  },
});

export default StandMarker;

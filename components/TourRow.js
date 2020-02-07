import React, { Component } from "react";
import {
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ImageBackground
} from "react-native";
import {Icon,Rating} from 'react-native-elements';

class TourRow extends Component {
    render() {
        return (
          <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('StandInfo', {item : this.props.item })}
          background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{flex:1, height: 140, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 }}>
                <View style={{ flex: 2 }}>
                    <ImageBackground source={{uri:this.props.item.cover}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}>
                        <View style={styles.bubble}>
                          <Text style={[styles.standIdLabel]}>{this.props.item.stand_number+100}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
          </TouchableNativeFeedback>
        );
    }
}
export default TourRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
      fontSize: 16,
      color: '#000000',
      flex:1,
    },
    descriptionText: {
      fontSize: 10,
      color: '#000000',
    },
    bubble: {
      flex: 0,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      backgroundColor: '#A9A9A9',
      padding: 2,
      borderRadius: 3,
      borderColor: '#A9A9A9',
      borderWidth: 0.5,
    },
    distanceText: {
      fontSize: 12,
      color: '#000000',
      flex:1,
    },
    nextEventText: {
      fontSize: 12,
      color: '#000000',
      flex:1,
    },
    standIdLabel: {
      color: '#FFFFFF',
      fontSize: 13,
    },
    directionsButton:{
      backgroundColor:'#00558B',
      flex: 0,
      flexDirection: 'row',
      borderRadius: 6,
      padding: 6,
      alignSelf: 'flex-start',
      alignContent: 'center',
      justifyContent: 'center',
    },
    directionsButtonLabel: {
      color: '#FFFFFF',
      fontSize: 12,
      paddingLeft:8,
      alignContent: 'center',
      justifyContent: 'center',
    },
    feedbackViewContainer: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
});

import React, { Component } from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
    StyleSheet,
    Image
} from "react-native";

class MapCard extends Component {
    render() {
        return (
          <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('StandInfo', {item : this.props.item })}
          background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{height: 180,width: 220, marginLeft: 20,marginBottom: 10, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri:this.props.item.cover}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, padding: 16}}>
                    <Text style={styles.titleText}>{this.props.item.title}</Text>
                </View>
            </View>
          </TouchableNativeFeedback>
        );
    }
}
export default MapCard;

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

});

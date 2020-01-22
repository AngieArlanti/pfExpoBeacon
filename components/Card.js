import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Card extends Component {
    render() {
        return (
            <View style={{height: 180,width: 220, marginLeft: 20,marginBottom: 10, borderWidth: 0.5, borderColor: '#dddddd', backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri:this.props.imageUri}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, padding: 16}}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.distanceText}>{this.props.distance}</Text>
                    <Text style={styles.nextEventText}>{this.props.nextEvent}</Text>
                </View>
            </View>
        );
    }
}
export default Card;

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

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

class TourCategoryButton extends Component {
    render() {
        return (
          <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('TourDetailScreen')}
          background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{flex:1, height: 160, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 }}>
                <View style={{ flex: 2 }}>
                    <ImageBackground source={this.props.image}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}>
                        <View style={styles.backgroudOverlay}>
                          <Text style={styles.title}> {this.props.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
          </TouchableNativeFeedback>
        );
    }
}
export default TourCategoryButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#ffffff',
      flex:1,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      position: 'absolute',
      bottom:16,
      left:16
    },
    backgroudOverlay:{
      flex:1,
      backgroundColor: 'rgba(128, 128, 128, 0.2)'
    }
});

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
import{STAND_TOUR_DETAIL_TYPES} from '../assets/constants/constants';

class TourPreviewRow extends Component {
    constructor(props){
        super(props);
    }
    onPress = () => {
      let destination = this.props.nextScreen;
      this.props.navigation.navigate(destination, {
         uri:this.props.uri
      });
    }
    render() {
        let properties = this.props;
        return (
          <View style={{flex:1,backgroundColor: 'white',height:356}}>
            <View style={{flex:1,flexDirection: 'column'}}>
                <View style={{flex:1,paddingLeft: 8, paddingTop:16 ,paddingBottom: 8}}>
                  <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={{flex:6, paddingBottom: 8}}>
                  <TouchableNativeFeedback
                    style={{flex:6}}
                    onPress={() => this.onPress()}
                    background={TouchableNativeFeedback.SelectableBackground()
                  }>
                  <View style={{flex:1}}>
                      <View style={{flex:7}}>
                          <View style={{flex:3,flexDirection: 'row',backgroundColor: 'white'}}>
                            <View style={{flex:6,marginRight:2}}>
                              <Image style={{flex:1}} resizeMode='cover' source={require('../assets/images/tours-populares.jpg')}/>
                            </View>
                            <View style={{flex:4,flexDirection: 'column',backgroundColor: 'white',marginLeft: 2}}>
                              <View style={{flex:1,marginBottom: 2,marginLeft: 2}}>
                                <Image style={{flex:1}} resizeMode='cover' source={require('../assets/images/tours-tiempo.jpg')}/>
                              </View>
                              <View style={{flex:1,marginLeft: 2}}>
                                <Image style={{flex:1}} resizeMode='cover' source={require('../assets/images/muestra.jpg')}/>
                              </View>
                            </View>
                          </View>
                      </View>
                      <View style={{flex:1, paddingTop: 8,paddingLeft: 8, paddingBottom:8}}>
                        <Text style={styles.tourDescription}>{this.props.description}</Text>
                      </View>
                    </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        );
    }
}
export default TourPreviewRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: '#666666',
      flex:1,
    },
    tourDescription: {
      fontSize: 14,
      fontWeight: '500',
      color: '#999999',
      flex:1,
    },
    backgroudOverlay:{
      flex:1,
      backgroundColor: 'rgba(128, 128, 128, 0.2)'
    }
});

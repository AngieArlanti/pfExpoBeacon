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
import {Icon} from 'react-native-elements';

class TourRow extends Component {
    render() {
        return (
          <View style={styles.container}>
          <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('StandInfo', {item : this.props.item })}
          background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{flex:1, flexDirection: 'row', backgroundColor: '#ffffff', shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 2 }}>
              <View style={{flex:1,margin: 16, width: 102}}>
                    <View style={styles.coverImageContainer}>
                        <Image style={styles.coverImageRound} source={{uri:this.props.item.cover}}/>
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{this.props.stepNumberInTour+1}</Text>
                        </View>
                        <View
                          style = {{
                            height: 200,
                            width: 0.8,
                            backgroundColor: '#202020',
                            alignSelf: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            position:'absolute',
                            right:51,
                            zIndex:-10,
                            top:0,
                          }}
                        />
                    </View>
                </View>
                <View style={{flex:3,alignItems: 'stretch',marginVertical: 16,marginRight: 16}}>
                    <View style={{flex:1,flexDirection: 'row'}}>
                      <Text style={styles.titleText}>{this.props.item.title}</Text>
                      <Icon color="black" name={"chevron-right"} size={12} style={{flex:1,alignSelf: 'flex-end',
                      alignContent: 'center',
                      justifyContent: 'center',marginRight: 16}}/>
                    </View>
                    <Text style={styles.averageTimeText}>Average time in stand</Text>
                    <Text style={styles.descriptionText}>{this.props.item.short_description}</Text>
                </View>
            </View>
          </TouchableNativeFeedback>
          </View>
        );
    }
}
export default TourRow;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
      fontSize: 18,
      color: '#000000',
      fontWeight: '600',
      flex:4,
      alignSelf: 'flex-start'
    },
    averageTimeText:{
      fontSize: 12,
      color: '#000000'
    },
    descriptionText: {
      paddingTop: 10,
      fontSize: 12,
      color: '#000000'
    },
    coverImageContainer:{
      width:80,
      height:80,
      position: 'absolute',
      zIndex: -11,
    },
    coverImageRound: {
        borderWidth:0.4,
        borderColor:'rgba(220,220,220,0.2)',
        width:58,
        height:58,
        borderRadius:29,
        alignItems:'center',
        flexDirection: 'column',
        justifyContent:'flex-start',
        position: 'absolute',
        zIndex: 1,
    },
    badge: {
        width:22,
        height:22,
        borderRadius:11,
        right: 10,
        top:2,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        backgroundColor: '#00558B',
        borderColor: '#ffffff',
        borderWidth: 1,
        color: '#ffffff',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,

    },
    badgeText:{
      fontSize: 12,
      color:'#ffffff',
    },
});

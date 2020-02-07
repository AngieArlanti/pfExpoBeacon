import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Animated, Text, TouchableOpacity} from 'react-native';
import StandListTour from './StandListTour';
import { Card, CardItem, Button } from 'native-base';
import { colors, Icon } from 'react-native-elements';
import TourDetailScreen from './tourDetailScreen';
import TourCategoryButton from './components/TourCategoryButton'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 25;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ToursScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = { isLoading: true};
        this.state = {
            scrollY: new Animated.Value(0),
          };
    }

  // Lifecycle events
  componentDidMount(){
    this.getSuggestedCongestionTour();
  }

    getSuggestedCongestionTour(){
        return fetch('http://10.0.2.2:8080/stands/suggested_tour')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            }, function(){
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
          });

          const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          });
          const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
          });
        return(
            <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor = "rgba(0,0,0,0)" translucent = {true}/>

             <View style={styles.container}>

             <ScrollView
                 style={styles.container}
                 contentContainerStyle={styles.contentContainer}
                 scrollEventThrottle={16}
                 onScroll={Animated.event(
                   [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                   )}
             >
               <View style={styles.scrollViewContent}>
                <View style={{paddingBottom : 30}}>
                <TourCategoryButton title="Evitar filas" image={require('./assets/images/tours-esquivando-filas.jpg')} navigation={this.props.navigation}/>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TourDetailScreen')}>
                  <Icon color="white" name={"mood"} size={30} style={{alignSelf: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',}}/>
                  <Text style={styles.buttonText}>Evita filas</Text>
                </TouchableOpacity>
                </View>
                <View style={{paddingBottom : 30}}>
                <TouchableOpacity style={styles.button}>
                  <Icon color="white" name={"thumb-up"} size={30} style={{alignSelf: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',}}/>
                  <Text style={styles.buttonText}>Recorridos Populares</Text>
                </TouchableOpacity>
                </View>
                <View style={{paddingBottom : 30}}>
                <TouchableOpacity style={styles.button}>
                  <Icon color="white" name={"alarm"} size={30} style={{alignSelf: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',}}/>
                  <Text style={styles.buttonText}>Tengo 1 Hora</Text>
                </TouchableOpacity>
                </View>
                <View style={{paddingBottom : 30}}>
                <TouchableOpacity style={styles.button}>
                  <Icon color="white" name={"alarm"} size={30} style={{alignSelf: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',}}/>
                  <Text style={styles.buttonText}>Tengo 2 Hora</Text>
                </TouchableOpacity>
                </View>
                </View>
               </ScrollView>

           </View>
             <Animated.View style={[styles.header, {height: headerHeight}]}>
           <Animated.Image
             style={[
               styles.backgroundImage,
               {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
             ]}
             source={require('./itba.jpg')}
           />
           </Animated.View>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#609bd1',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    scrollViewContent: {
      marginTop: HEADER_MAX_HEIGHT + 30,
    },
    button : {
      backgroundColor:'#00558B',
      flex: 0,
      flexDirection: 'row',
      borderRadius: 6,
      padding: 6,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    buttonText : {
      color: '#FFFFFF',
      fontSize: 20,
      paddingLeft: 15,
      alignContent: 'center',
      justifyContent: 'center',
    }
});

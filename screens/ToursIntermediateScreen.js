import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Animated, Text, TouchableOpacity} from 'react-native';
import StandListTour from '../StandListTour';
import { Card, CardItem, Button } from 'native-base';
import { colors, Icon } from 'react-native-elements';
import TourDetailScreen from '../tourDetailScreen';
import TourCategoryButton from '../components/TourCategoryButton'
import TourPreviewRow from '../components/TourPreviewRow'
import {BASE_PATH,HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT,HEADER_SCROLL_DISTANCE,STAND_TOUR_DETAIL_TYPES} from '../assets/constants/constants';

export default class ToursIntermediateScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = { isLoading: true};
        this.state = {
            scrollY: new Animated.Value(0),
          };
    }
    // Lifecycle events
    componentDidMount(){
      this.getTopPopularTours();
    }

    getTopPopularTours(){
        return fetch(BASE_PATH+this.props.navigation.state.params.uri)
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
                <View>
                {(this.state.dataSource!==undefined) &&
                  <TourCategoryButton title="Tour popular: opción A" image={require('../assets/images/tours-populares.jpg')} navigation={this.props.navigation} stands={this.state.dataSource[0].tour} detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                }
                {(this.state.dataSource!==undefined) &&
                  <TourCategoryButton title="Tour popular: opción B" image={require('../assets/images/tours-esquivando-filas.jpg')} navigation={this.props.navigation} uri="/tour/time_limited?time_limit=1" stands={this.state.dataSource[1].tour} detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                }
                {(this.state.dataSource!==undefined) &&
                  <TourCategoryButton title="Tour popular: opción C" image={require('../assets/images/tours-tiempo.jpg')} navigation={this.props.navigation} uri="/tour/time_limited?time_limit=2" stands={this.state.dataSource[2].tour}  detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                }
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
             source={require('../itba.jpg')}
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
      marginTop: HEADER_MAX_HEIGHT,
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

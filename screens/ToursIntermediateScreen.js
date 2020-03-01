import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Animated} from 'react-native';
import TourCategoryButton from '../components/TourCategoryButton'
import {TOURS_TOP_THREE_SERVICE_URL, HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT,HEADER_SCROLL_DISTANCE,STAND_TOUR_DETAIL_TYPES} from '../assets/constants/constants';
import {saveLocation} from '../services/locationClient';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import NoInternetView from '../components/NoInternetView'

export default class ToursIntermediateScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = { isLoading: true};
        this.state = { showNoInternet: false};
        this.state = {
            scrollY: new Animated.Value(0),
          };
        this.onRetryPress = this.getTopPopularTours.bind(this);
    }
    // Lifecycle events
    componentDidMount(){
      this.getTopPopularTours();
      saveLocation();
    }

  //////////////////
  //TODO TOUR SERVICES - Modularize
  //import {getNoLinesTour} from '../services/toursClient';
  //////////////////
    getTopPopularTours(){
      this.setState({
        showNoInternet:false,
        isLoading:true,
      });
        return fetch(TOURS_TOP_THREE_SERVICE_URL)
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                isLoading: false,
                dataSource: responseJson,
              }, function(){
              });
            })
            .catch((error) =>{
              this.setState({
                isLoading: false,
                showNoInternet:true,
              }, function(){
              });
            });
    }
  //////////////////
  //////////////////

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
                      {(this.state.dataSource!==undefined && this.state.dataSource.length >0) &&
                        <TourCategoryButton title="Tour popular: opción A" image={require('../assets/images/tours-populares.jpg')} navigation={this.props.navigation} stands={this.state.dataSource[0].tour} detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                      }
                      {(this.state.dataSource!==undefined && this.state.dataSource.length >0) &&
                        <TourCategoryButton title="Tour popular: opción B" image={require('../assets/images/tours-esquivando-filas.jpg')} navigation={this.props.navigation} stands={this.state.dataSource[1].tour} detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                      }
                      {(this.state.dataSource!==undefined && this.state.dataSource.length >0) &&
                        <TourCategoryButton title="Tour popular: opción C" image={require('../assets/images/tours-tiempo.jpg')} navigation={this.props.navigation} stands={this.state.dataSource[2].tour}  detailType={STAND_TOUR_DETAIL_TYPES.MAP_DETAIL}/>
                      }
                      {(this.state.isLoading || this.state.isLoading===undefined) &&
                        <SkeletonContent
                            containerStyle={{flex:1}}
                            isLoading={this.state.isLoading}
                            layout={[
                                      { key:"card1", width:450, height: 160, marginBottom:4,marginTop:0},
                                      { key:"card2", width:450, height: 160, marginBottom:4,marginTop:4},
                                      { key:"card3", width:450, height: 160, marginBottom:4,marginTop:4},
                                      { key:"card4", width:450, height: 160, marginBottom:4,marginTop:4},
                                    ]}
                          />
                        }
                        {(this.state.showNoInternet && !this.state.isLoading) &&
                          <NoInternetView style={{flex: 1}} onPress={this.onRetryPress}/>
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

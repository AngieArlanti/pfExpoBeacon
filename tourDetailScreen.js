import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Animated, Text} from 'react-native';
import ToursStandListView from './components/ToursStandListView';
import MapComponentView from './components/MapComponentView';
import {HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT,HEADER_SCROLL_DISTANCE,BASE_PATH,MAP_COMPONENT_VIEW_TYPES} from './assets/constants/constants';

export default class ToursDetailScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
          };
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
          console.log(this.props.navigation);
        return(
            <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor = "rgba(0,0,0,0)" translucent = {true}/>
            {(this.props.navigation.state.params.stands!== undefined) &&
              <MapComponentView style={styles.mapView} stands={this.props.navigation.state.params.stands} mapType={MAP_COMPONENT_VIEW_TYPES.TOUR} navigation={this.props.navigation} />
            }
            <View style={styles.tourView}>
              <ScrollView
                 style={styles.container}
                 contentContainerStyle={styles.contentContainer}
                 scrollEventThrottle={16}
                 onScroll={Animated.event(
                   [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                   )}
              >
                {(this.props.navigation.state.params.stands!== undefined) &&
                  <ToursStandListView stands={this.props.navigation.state.params.stands} navigation={this.props.navigation} isLoadingList={this.state.isLoading}/>
                }
              </ScrollView>
           </View>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapView: {
      flex: 1,
    },
    tourView: {
      flex: 2,
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
});

import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Animated} from 'react-native';
import TourPreviewRow from './components/TourPreviewRow'
import {HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT,HEADER_SCROLL_DISTANCE} from './assets/constants/constants';

export default class ToursScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = { isLoading: true};
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
                <TourPreviewRow title="Visitá lo mejor, ¡ahora!" description="Te sugerimos qué stand visitar, evitando filas y sin perderte lo mejor" navigation={this.props.navigation} nextScreen="StandTourDetailsSwipeScreen" imgSourceLeft={require('./assets/images/tours/expo1.jpg')} imgSourceTop={require('./assets/images/tours/expo2.jpg')} imgSourceBottom={require('./assets/images/tours/expo3.jpg')} />
                <TourPreviewRow title="Tours populares" description="Recorré los tours más visitados de la exposición" navigation={this.props.navigation} nextScreen="ToursIntermediateScreen" imgSourceLeft={require('./assets/images/tours/expo7.jpg')} imgSourceTop={require('./assets/images/tours/expo5.jpg')} imgSourceBottom={require('./assets/images/tours/expo6.jpg')}/>
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

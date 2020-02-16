import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Animated, ScrollView} from 'react-native';
import StandList from './standList';
import StandInfo from './standInfo';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SearchScreen from './searchScreen';
import ToursScreen from './toursScreen';
import TourDetailScreen from './tourDetailScreen';
import ProfileScreen from './profileScreen';
import ImageGalleryScreen from './imageGalleryScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT,HEADER_SCROLL_DISTANCE,STAND_LIST_SERVICE_URL} from './assets/constants/constants';

class App extends Component {

constructor(props) {
  super(props);
  this.state = { isLoading: true};
  this.state = { isDataAvailable: false};
  this.state = {
    scrollY: new Animated.Value(0),
  };
}

// Lifecycle events
componentDidMount(){
  //Refresh standList
  this._subscribe = this.props.navigation.addListener('didFocus', () => {
    this.getAllStands();
  });
}

// Services TODO: Modularize
getAllStands(){
  return fetch(STAND_LIST_SERVICE_URL)
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
 return (
   <View style={styles.container}>
     <StatusBar hidden = {false} backgroundColor = "rgba(0,0,0,0)" translucent = {true}/>
      <View style={styles.top} >
      <View style={styles.container}>

      <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
      >
        {(this.state.dataSource !== null && this.state.dataSource !== undefined) &&
        <StandList stands={this.state.dataSource} navigation={this.props.navigation} isLoadingList={this.state.isLoading}/>}
        </ScrollView>

    </View>
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
    backgroundColor: '#F5FCFF',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3d7ab3',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

const HighlightNavigator = createStackNavigator({
  App: {screen: App},
  StandInfo: {screen: StandInfo},
  ImageGalleryScreen: ImageGalleryScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
});

HighlightNavigator.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'ImageGalleryScreen' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

const SearchNavigator = createStackNavigator({
  SearchScreen : SearchScreen,
  StandInfo: {screen: StandInfo},
  ImageGalleryScreen: ImageGalleryScreen,
  },
  {
  defaultNavigationOptions: {
    header: null,
  }
});

SearchNavigator.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'ImageGalleryScreen' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

const ToursNavigator = createStackNavigator({
  ToursScreen : ToursScreen,
  TourDetailScreen : TourDetailScreen,
  StandInfo: {screen: StandInfo},
  ImageGalleryScreen: ImageGalleryScreen,
},
{
    defaultNavigationOptions: {
      header: null,
    }
});

ToursNavigator.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'ImageGalleryScreen' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

const ProfileNavigator = createStackNavigator({
  ProfileScreen : ProfileScreen,
},
{
    defaultNavigationOptions: {
      header: null,
    }
});

const TabNavigator = createBottomTabNavigator(
  {
    Highlight : {
      screen : HighlightNavigator,
      navigationOptions:{
        tabBarLabel : 'Destacados',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-star" color={tintColor} size={25}/>
        )
      }
    },
    Search : {
      screen : SearchNavigator,
      navigationOptions:{
        tabBarLabel : 'Buscar',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-search" color={tintColor} size={25}/>
        )
      }
    },
    Tours : {
      screen : ToursNavigator,
      navigationOptions:{
        tabBarLabel : 'Tours',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-map" color={tintColor} size={25}/>
        )
      }
    },
  },
  {
    tabBarOptions: {
    style: {
      backgroundColor: '#3d7ab3',
    },
    activeTintColor: 'white',
    inactiveTintColor: '#b7c1c9',
  }
}
);

const AppNavigation = createAppContainer(
  createSwitchNavigator({
    Main : TabNavigator,
    }
  )
);

export default AppNavigation;

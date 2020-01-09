import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';
import StandList from './standList';
import StandInfo from './standInfo';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SearchScreen from './searchScreen';
import ToursScreen from './toursScreen';
import ProfileScreen from './profileScreen';
import Icon from 'react-native-vector-icons/Ionicons';  

class App extends Component {

constructor(props) {
  super(props);
  this.state = { isLoading: true};
  this.state = { isDataAvailable: false};
  //TODO: Figure out how to correctly initialize prop
  this.state = { dataSource:[{}]};
}

// Lifecycle events
componentDidMount(){
  this.getAllStands();
}

// Services TODO: Modularize
getAllStands(){
  return fetch('http://private-f63ff-standsv1.apiary-mock.com/stands')
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
 return (
   <View style={styles.container}>
     <StatusBar hidden = {false} backgroundColor = "rgba(0,0,0,0)" translucent = {true}/>
      <View style={styles.top} >
            <Header
      centerComponent={{ text: 'EXPO ITBA', style: { color: '#fff' } }}
      />
        <StandList stands={this.state.dataSource} navigation={this.props.navigation} isLoadingList={this.state.isLoading}/>
      </View>
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
});

const HighlightNavigator = createStackNavigator({
  App: {screen: App},
  StandInfo: {screen: StandInfo},
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
});

const SearchNavigator = createStackNavigator({
  SearchScreen : SearchScreen,
  StandInfo: {screen: StandInfo},
  },
  {
  defaultNavigationOptions: {
    header: null,
  }
});

const ToursNavigator = createStackNavigator({
  ToursScreen : ToursScreen,
},
{
    defaultNavigationOptions: {
      header: null,
    }
});

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
    Profile : {
      screen : ProfileNavigator,
      navigationOptions:{
        tabBarLabel : 'Perfil',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-person" color={tintColor} size={25}/>  
        )
      }
    },
  },
  {
    tabBarOptions: {
      backgroundColor: '#F5FCFF',
    },
  }  
);

const AppNavigation = createAppContainer(
  createSwitchNavigator({
    Main : TabNavigator,
    }
  )
);

export default AppNavigation;

import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';
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
}

// Lifecycle events
componentDidMount(){
  this.getAllStands();
}

// TODO Eliminar cuando conectemos con server real.
// REEMPLACEN POR SU IP SI CORREN EN ANDROID FISICO, LA PUEDEN OBTENER CON: ifconfig | grep "inet " | grep -v 127.0.0.1
// REEMPLAZAR POR 10.0.2.2 SI CORREN EN EMULADOR ANDROID
// Services TODO: Modularize
getAllStands(){
  return fetch('http://192.168.0.175:8080/stands/list')
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
      <View style={styles.top} >
            <Header
      centerComponent={{ text: 'EXPO ITBA', style: { color: '#fff' } }}
      />
        {(this.state.dataSource !== null && this.state.dataSource !== undefined) &&
        <StandList stands={this.state.dataSource} navigation={this.props.navigation} isLoadingList={this.state.isLoading}/>}
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

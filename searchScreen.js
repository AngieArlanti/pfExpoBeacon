import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapComponentView from './components/MapComponentView';
import {STAND_LIST_SERVICE_URL,MAP_COMPONENT_VIEW_TYPES} from './assets/constants/constants';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Snackbar from 'react-native-snackbar';
import NoInternetView from './components/NoInternetView'

export default class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true};
    this.state = { showNoInternet: false};
    this.state = { isDataAvailable: false};
    this.state = { data: [{}]};
    this.state = { standsDataSource:[{}]};
    this.onRetryPress = this.getAllStands.bind(this);
  }
  // Lifecycle events
  componentDidMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAllStands();
    });
  }

  // Services TODO: Modularize
  getAllStands(){
    let showLoading = true;
    if(this.state.standsDataSource!==undefined && this.state.standsDataSource.length>1){
      showLoading = false;
    }
    this.setState({
      showNoInternet:false,
      isLoading:showLoading,
    });
    return fetch(STAND_LIST_SERVICE_URL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        standsDataSource: responseJson,
        showNoInternet:false,
      }, function(){
      });
    })
    .catch((error) =>{
      let showNoInternet = true
      if(this.state.standsDataSource!==undefined && this.state.standsDataSource.length>1){
        showNoInternet = false;
        this.showSnackbar();
      }

      this.setState({
        isLoading: false,
        showNoInternet: showNoInternet,
      }, function(){
      });
    });
  }

  showSnackbar(){
    Snackbar.show({
      text: '¡Parece que no hay internet!',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor:'red',
      action: {
        text: 'REINTENTAR',
        textColor: 'white',
        onPress: () => {this.getAllStands();},
      },
    });
  }
render() {

  return (
    <View style={styles.container}>
      <StatusBar style={styles.container} hidden={false} backgroundColor="#609bd1" translucent={true}/>
      {
        (this.state.standsDataSource.length!==1) && <MapComponentView style={styles.container} stands={this.state.standsDataSource} mapType={MAP_COMPONENT_VIEW_TYPES.DEFAULT} navigation={this.props.navigation} />
      }
      {
        (this.state.isLoading || this.state.isLoading===undefined) &&
        <SkeletonContent
          containerStyle={{flex: 1}}
          isLoading={this.state.isLoading}
          layout={[
                  { key: "card1",position:'absolute', height: 180,width: 220, marginLeft: 20,bottom: 24, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2 },
                  { key: "card2",position:'absolute', height: 180,width: 220, marginLeft: 260,bottom: 24, borderWidth: 0.5, borderRadius: 6,borderColor: '#dddddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 } , shadowOpacity: 0.8, shadowRadius: 2  },
                  ]}
        />
      }
      {(this.state.showNoInternet && !this.state.isLoading) &&
        <NoInternetView style={{flex: 1}} onPress={this.onRetryPress}/>
      }
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
  });

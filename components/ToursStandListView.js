import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,Image,ActivityIndicator, StatusBar} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import {Rating} from 'react-native-elements';
import  TourRow from './TourRow';

/**
* @param props properties needed to render ToursStandListView:
* - stands: array of stands' data.
*/


export default class ToursStandListView extends React.Component {
  constructor(props){
  super(props);

}
  keyExtractor = (item, index) => index.toString()

  renderTourRow= ({ item }) => (
    <TourRow item={item} navigation={this.props.navigation}/>
  )

  render () {
    return (
    <View style={styles.scrollViewContent}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.stands}
        renderItem={this.renderTourRow}
      />
    </View>
    )}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tabBarInfoText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  textAlign: 'center',
  },
  beaconDetailContainer: {
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  sameLineComponents : {
    flex: 1,
    flexDirection: 'row',
    paddingTop : 0,
    paddingBottom : 0,
  },
  rating : {
    paddingTop: 3,
    paddingLeft : 10,
    paddingRight : 10
  },
  dataTitle:{
    fontSize: 20,
    color : 'black',
  },
  alignRanking: {
    paddingTop: 5,
  },
})

import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,Image,ActivityIndicator, StatusBar} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import {Rating} from 'react-native-elements';

/**
* @param props properties needed to render StandList:
* - stands: array of stands' data.
*/

const HEADER_MAX_HEIGHT = 300;

export default class StandList extends React.Component {
  constructor(props){
  super(props);

}
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <Card style={{borderRadius: 100}}>
      <CardItem bordered cardBody button onPress= {() => this.props.navigation.navigate('StandInfo', {item : item })}>
        <Image source={{ uri :  item.cover }} style={styles.image} />
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={styles.dataTitle}>{item.title}</Text>
          <View style={[styles.sameLineComponents, styles.alignRanking]}>
            <Text>{item.ranking_average.ranking.toFixed(1)}</Text>
            <Rating
              type = 'star'
              imageSize={15}
              readonly
              startingValue={item.ranking_average.ranking}
              style = {styles.rating}
            />
            <Text>({item.ranking_average.cant_rates})</Text>
          </View>
          <Text>
            {item.short_description}
          </Text>
        </Body>
      </CardItem>
    </Card>
  )

  render () {
    
  if(this.props.isLoadingList){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
  return (
    
      <View style={styles.scrollViewContent}>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={this.props.stands}
      renderItem={this.renderItem}
    />
    </View>
    
  )
  }
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
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
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

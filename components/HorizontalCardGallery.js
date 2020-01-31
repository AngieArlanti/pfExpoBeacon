import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,Image,ActivityIndicator, StatusBar} from 'react-native';
import { CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import MapCard from './MapCard';

/**
* @param props properties needed to render HorizontalCardGallery:
* - stands: array of stands' data.
*/

export default class HorizontalCardGallery extends React.Component {
  constructor(props){
  super(props);
}
  keyExtractor = (item, index) => index.toString()

  componentDidUpdate(prevProps) {
     if ((prevProps.indexSelected !== this.props.indexSelected) && (this.props.indexSelected!== undefined)) {
       this.scrollToItem();
     }
   }

  renderCard = ({ item }) => (
    <MapCard item={item} navigation={this.props.navigation}/>
  )

  scrollToItem = () => {
    this.flatListRef.scrollToIndex({index:this.props.indexSelected, viewPosition:0.5, animated:true});
  }

  render () {

  return (

      <View style={styles.scrollViewContent}>
    <FlatList
      ref={(ref) => { this.flatListRef = ref; }}
      keyExtractor={this.keyExtractor}
      data={this.props.stands}
      renderItem={this.renderCard}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
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
})

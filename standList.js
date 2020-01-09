import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,Image,ScrollView,ActivityIndicator, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements'

/**
* @param props properties needed to render StandList:
* - stands: array of stands' data.
*/
export default class StandList extends React.Component {
  constructor(props){
  super(props);
}
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
  <ListItem
    title={item.title}
    subtitle={item.short_description}
    leftAvatar={{
      source: item.cover_url && { uri: item.cover_url }
    }}
    onPress= {() => this.props.navigation.navigate('StandInfo', {
      item : item })}
    bottomDivider
    chevron
  />
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
    <View style={styles.container}>
      
    <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={this.props.stands}
      renderItem={this.renderItem}
    />
    </ScrollView>
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

import React, { Component } from 'react';
import { FlatList, StyleSheet, View,ActivityIndicator, Text} from 'react-native';
import { ListItem } from 'react-native-elements'

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

  renderItem = (item, index) => (
    <ListItem
    leftElement={index}
    title={item.title}
    subtitle={item.short_description}
    leftAvatar={{
      source: item.cover && { uri: item.cover }
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
    
      <View style={styles.scrollViewContent}>
        <Text style={styles.title}>Camino sugerido</Text>
        <Text style={styles.text}>No te pierdas los stands mejor rankeados y recorrelos evitando las congestiones de gente</Text>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={this.props.stands}
      renderItem={({item, index}) => this.renderItem(item, index+1)}
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
  title: {
    backgroundColor: 'transparent',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
})

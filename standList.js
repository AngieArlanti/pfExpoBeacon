import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,Image,ScrollView,ActivityIndicator, StatusBar, Animated } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

/**
* @param props properties needed to render StandList:
* - stands: array of stands' data.
*/

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 25;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class StandList extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    scrollY: new Animated.Value(0),
  };
}
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <Card style={{borderRadius: 100}}>
      <CardItem bordered cardBody button onPress= {() => this.props.navigation.navigate('StandInfo', {item : item })}>
        <Image source={{ uri :  item.cover }} style={styles.image} />
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={styles.dataTitle}>
            {item.title}
          </Text>
          <Text>
            {item.short_description}
          </Text>
        </Body>
      </CardItem>
    </Card>
  )

  render () {
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
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
    >
      <View style={styles.scrollViewContent}>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={this.props.stands}
      renderItem={this.renderItem}
    />
    </View>
    </ScrollView>
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
  dataTitle:{
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
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
    backgroundColor: '#609bd1',
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
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
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
})

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default class StandInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.navigation.state.params.item.pictures[0]);
    return (
      <View style={styles.container}>
         <StatusBar hidden = {false} backgroundColor = '#609bd1' translucent = {true}/>
         <View style={styles.top} >
           <ScrollView>
           <SliderBox images={this.props.navigation.state.params.item.pictures} sliderBoxHeight={500} sliderBoxwidth={null}  />
            <Text style={styles.title}>{this.props.navigation.state.params.item.title}</Text>
            <Text style={styles.text}>{this.props.navigation.state.params.item.description}</Text>
            </ScrollView>
        </View>
      </View>
    );
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
  top: {
    flex: 1,
    marginTop:23,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  align : {
    flexDirection: 'row',
    justifyContent:'center',
  },
  image: {
    height: 1000,
    width: null,
    flex: 1,
  },
})

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating, AirbnbRating } from 'react-native-elements';
import { getUniqueId } from 'react-native-device-info';
import {STAND_RANKING_SERVICE_URL} from './assets/constants/constants';

export default class StandInfo extends React.Component {

  constructor(props) {
    super(props);
    standId = this.props.navigation.state.params.item.id;
  }

  ratingCompleted(rating) {
    fetch(STAND_RANKING_SERVICE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stand_id : standId,
        device_id: getUniqueId(),
        ranking: rating,
      }),
    });
    console.log(rating);
  }

  render() {
    return (
      <View style={styles.container}>
         <StatusBar hidden = {false} backgroundColor = '#609bd1' translucent = {true}/>
         <View style={styles.top, styles.lineStyle} >
           <ScrollView>
           <SliderBox images={this.props.navigation.state.params.item.pictures} sliderBoxHeight={500} sliderBoxwidth={null}/>
            <View style={styles.lineStyle} >
                <Text style={styles.title}>{this.props.navigation.state.params.item.title}</Text>
                <View style = {styles.sameLineComponents}>
                  <Text>{this.props.navigation.state.params.item.ranking_average.ranking.toFixed(1)}</Text>
                  <Rating
                    type = 'star'
                    imageSize={10}
                    readonly
                    startingValue={this.props.navigation.state.params.item.ranking_average.ranking}
                    style = {styles.rating}
                  />
                  <Text>({this.props.navigation.state.params.item.ranking_average.cant_rates})</Text>
                </View>
                <Text style={styles.text}>{this.props.navigation.state.params.item.description}</Text>
            </View>

            <View style={styles.lineStyle} >
                <Text style={styles.subTitle}>Calificanos, que te pareció?</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  reviews={["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente"]}
                  size={20}
                  onFinishRating={this.ratingCompleted}
                />
             </View>
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
    color: 'black',
    padding : 10,
    paddingTop: 10,
    paddingBottom: 0,
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
  lineStyle:{
    borderBottomColor: '#e3e4e8',
    borderBottomWidth: 1,
    paddingBottom : 10,
  },
  subTitle : {
    fontSize : 20,
    textAlign: 'center',
    paddingTop : 10,
    fontWeight : 'bold',
  },
  sameLineComponents : {
    flex: 1,
    flexDirection: 'row',
    padding : 10,
    paddingTop : 0,
    paddingBottom : 0,
  },
  rating : {
    paddingTop : 5,
    paddingLeft : 10,
    paddingRight : 10
  },
})

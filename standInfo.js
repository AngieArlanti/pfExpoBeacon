import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating, AirbnbRating } from 'react-native-elements';
import { getUniqueId } from 'react-native-device-info';
import ImageZoom from 'react-native-image-pan-zoom';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCarousel from 'react-native-image-page';

export default class StandInfo extends React.Component {

  constructor(props) {
    super(props);
    standId = this.props.navigation.state.params.item.id;
  }

  ratingCompleted(rating) {
    fetch('http://10.0.2.2:8080/stand_ranking', {
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
           {/*<SliderBox images={this.props.navigation.state.params.item.pictures} sliderBoxHeight={500} sliderBoxwidth={null}/>*/}
           <View>
           <ImageCarousel
          height={200}
          delay={2000}
          indicatorSize={10}
          indicatorOffset={-20}
          indicatorColor="red"
          images={this.props.navigation.state.params.item.pictures}
          />
          </View>
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
    height: 100,
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

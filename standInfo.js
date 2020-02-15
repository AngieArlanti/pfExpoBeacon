import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating, AirbnbRating } from 'react-native-elements';
import { getUniqueId } from 'react-native-device-info';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import SmartGallery from "react-native-smart-gallery";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#255EB3",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#255EB3",
  backgroundGradientToOpacity: 0,
  color: () => `rgb(37, 94, 179)`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
import {STAND_RANKING_SERVICE_URL} from './assets/constants/constants';
import {STAND_HISTOGRAM_SERVICE_URL} from './assets/constants/constants';

export default class StandInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dataSource:[{}]};
    this.getStandHistogram();
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
  }

  getStandHistogram(){
    return fetch(STAND_HISTOGRAM_SERVICE_URL+this.props.navigation.state.params.item.id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){
        const dataChart = {
          labels : [],
          datasets : [{
            data : []
          }]
        };
        let l = this.state.dataSource.map(e => e.from.substring(0,5))
        let d = this.state.dataSource.map(e => e.visits)
        dataChart.labels = l;
        dataChart.datasets[0].data = d;
        this.setState({data : dataChart});
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  smartGallery() {
    console.log(this.props.navigation.state.params.item.pictures)
    return (
      <SmartGallery
        images={this.props.navigation.state.params.item.pictures.map(function(picture) {
          return {
            uri : picture
          }
        })}
        loadMinimal={true}
        loadMinimalSize={2}
        // Turning this off will make it feel faster
        // and prevent the scroller to slow down
        // on fast swipes.
        sensitiveScroll={false}
         />
    )
  }

  


  render() {
    return (
      <View style={styles.container}>
         <StatusBar hidden = {false} backgroundColor = '#609bd1' translucent = {true}/>
         <View style={styles.top, styles.lineStyle} >
           <ScrollView>
            <SliderBox images={this.props.navigation.state.params.item.pictures} sliderBoxHeight={500} sliderBoxwidth={null}
              onCurrentImagePressed={() => this.props.navigation.navigate('ImageGalleryScreen', {pictures : this.props.navigation.state.params.item.pictures})}/>
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
             {(this.state.data !== null && this.state.data !== undefined) &&
             <View style={styles.lineStyle}>
               <Text style={styles.subTitle}>Horarios Populares</Text>
               <Text style={styles.text}>Basado en el historico de visitas en este stand</Text>
               <BarChart
                data={this.state.data}
                width={screenWidth}
                height={160}
                chartConfig={chartConfig}
                withHorizontalLabels={false}
                withInnerLines={false}
                strokeWidth={10}
                style={{
                  marginHorizontal: -35,
                }}
              />
             </View>}
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
    padding: 16,
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'black',
    padding : 16,
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
    paddingLeft : 16,
  },
  rating : {
    paddingTop : 5,
    paddingLeft : 10,
    paddingRight : 10
  },
})

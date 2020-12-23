import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import Profile from '../screens/profile'
import Registration from '../screens/register'
import {createAppContainer} from 'react-navigation'
import Popular from '../screens/popular'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons'
import {Ionicons} from '@expo/vector-icons'
import UpcomingMovies from '../screens/latestmovies'
import MovieGenre from '../screens/genre'
import Genrestack from './genrenavigator'
import Series from '../screens/series'
//import SeriesGenres from '../screens/seriesgen'
import SeriesGen from './seriesgenre'
import { AsyncStorage,Text, View,StyleSheet,Image } from 'react-native'
import SeriesTop from '../screens/seriestoprated'


const SeriesTab=createBottomTabNavigator({
  'Top rated':{
    screen:SeriesTop,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../assets/medal.png')} style={{height:30,width:30}}/>
      }
    }
  },
  Popular:{
    screen:Series,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../assets/trending.png')} style={{height:30,width:30}}/>
      }
    }
  },
  Genres:{
    screen:SeriesGen,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../assets/compass.png')} style={{height:30,width:30}}/>
      }
    }
  },
 
},
{
  defaultNavigationOptions:{
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    //activeBackgroundColor:'blue',
    showLabel:false,
    labelStyle:{
      fontSize:8,
      padding:0
    },
    style:{
      backgroundColor:'maroon',
      height:40,
      textAlign:'center',
      padding:0
    },
    activeBackgroundColor:'maroon',
    inactiveBackgroundColor:'black',
  },
}})
export default createAppContainer(SeriesTab)
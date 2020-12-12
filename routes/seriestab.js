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


const SeriesTab=createBottomTabNavigator({
  popular:{
    screen:Series,
   navigationOptions:{
     /*tabBarIcon:()=>{
       return <Ionicons name="md-trending-up" size={24} color="black" />
     }*/
   }
  },
  latest:{
    screen:Popular
  },
  genres:{
    screen:SeriesGen
  },
 
},
{
  defaultNavigationOptions:{
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    //activeBackgroundColor:'blue',
    style:{
      backgroundColor:'maroon',
      height:40,
      textAlign:'center'
    }
  },
}})
export default createAppContainer(SeriesTab)
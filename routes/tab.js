import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import { AsyncStorage,Text, View,StyleSheet,Image } from 'react-native'
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


const Tab=createBottomTabNavigator({
  Toprated:{
    screen:UpcomingMovies,
   navigationOptions:{
     tabBarIcon:()=>{
       return <Image source={require('../assets/medal.png')} style={{height:30,width:30}}/>
     }
   }
  },
  Popular:{
    screen:Popular,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../assets/trending.png')} style={{height:30,width:30}}/>
      }
    }
  },
  Genres:{
    screen:Genrestack,
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
    activeTintColor: 'purple',
    inactiveTintColor: 'white',
    showLabel:false,
    labelStyle:{
      fontSize:8
    },
    //activeBackgroundColor:'blue',
    style:{
      backgroundColor:'maroon',
      height:40,
      textAlign:'center',
      
    },
    activeBackgroundColor:'maroon',
    inactiveBackgroundColor:'black',
  },
}})
export default createAppContainer(Tab)
import React from 'react'
//import { Text, View } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import MovieGenres from '../screens/genre'
import Genremain from '../screens/choosengenre'
import Details from '../screens/details'
import SeriesGenres from '../screens/seriesgen'
import SeriesDetails from '../screens/seriesdetails'
import SeriesMain from '../screens/seriesmain'

const screens={

    genre:{
        screen:SeriesGenres,
        navigationOptions:({navigation})=>{
            return{
                headerTitle:()=><Header navigation={navigation} />,
                
                headerStyle:{
                    backgroundColor:'maroon',
                    height:40
                }
            }
            
            
        }
    },
    seriesmain:{
        screen:SeriesMain,
        navigationOptions:({navigation})=>{
            return{
                headerTitle:()=><Header navigation={navigation} />,
                
                headerStyle:{
                    backgroundColor:'maroon',
                    height:40
                }
            }
            
            
        }
    },
    
    
}

const SeriesGen=createStackNavigator(screens);

export default createAppContainer(SeriesGen);
import React from 'react'
//import { Text, View } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import MovieGenres from '../screens/genre'
import Genremain from '../screens/choosengenre'
import Details from '../screens/details'

const screens={

    genre:{
        screen:MovieGenres,
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
    main:{
        screen:Genremain,
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

const Genrestack=createStackNavigator(screens);

export default createAppContainer(Genrestack);
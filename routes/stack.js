import React from 'react'
//import { Text, View } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/home'
import Details from '../screens/details'
import Header from '../shared/header' 
import Popular from '../screens/popular'
import Renderitem from '../components/renderitem'
import SeriesDetails from '../screens/seriesdetails'


const screens={

    Home:{
        screen:Popular,
        navigationOptions:({navigation})=>{
            return{
                headerTitle:()=><Header navigation={navigation} />,
                
                headerStyle:{
                    backgroundColor:'maroon'
                }
            }
            
            
        }
        
    },

    Details:{
        screen:Details,
        navigationOptions:{
            title:'Details'
        }
    },
    
    SeriesDetails:{
        screen:SeriesDetails,
        navigationOptions:{
            title:'SeriesDetails'
        }
    },

    
    Renderitem:{
        screen:Renderitem,
        
    }
}

const Homestack=createStackNavigator(screens);

export default createAppContainer(Homestack);
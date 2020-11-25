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
import Registration from '../screens/register'
import Success from '../screens/success'
import LogIn from '../screens/login'

const screens={
    login:{
        screen:LogIn,
        navigationOptions:({navigation})=>{
            return{
                headerStyle:{
                    backgroundColor:'maroon',
                    
                },
                header:null,
            }
        }
    },
    Register:{
        screen:Registration,
        navigationOptions:({navigation})=>{
            return{
                headerStyle:{
                    backgroundColor:'maroon',
                    
                },
                header:null,
            }
        }
     
    },
    
   success:{
    screen:Success,
    navigationOptions:({navigation})=>{
     return{
        header:null
     }
 }
},
    
  
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

const regStack=createStackNavigator(screens);

export default createAppContainer(regStack);
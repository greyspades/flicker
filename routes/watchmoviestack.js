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
import Recommend from '../screens/recommend'
import Video from '../components/video'
import Login from '../screens/login'
import Registration from '../screens/register'
import Success from '../screens/success'
import Tab from './tab'
import profile from '../screens/profile'
import UpcomingMovies from '../screens/latestmovies'
import Genremain from '../screens/choosengenre'
import WatchList from '../screens/watchlist'

const screens={

    watchlist:{
        screen:WatchList,
        navigationOptions:{
            title:'Login',
            header:null,
            headerStyle:{
                backgroundColor:'maroon',
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
        screen:Tab,
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
    genre:{
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

    Details:{
        screen:Details,
        navigationOptions:{
            title:'Details',
            header:null,
            headerStyle:{
                backgroundColor:'maroon',
            }
        }
    },
    Recommend:{
        screen:Recommend,
        navigationOptions:{
            title:'Recommend',
            //header:null,
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:'maroon',
            }
        }
    },
    Video:{
        screen:Video,
        navigationOptions:{
            title:'Details',
            header:null,
            headerStyle:{
                backgroundColor:'maroon',
            }
        }
    },
    
    SeriesDetails:{
        screen:SeriesDetails,
        navigationOptions:{
            title:'SeriesDetails',
            header:null
        }
    },

    
    Renderitem:{
        screen:Renderitem,
        
    }
}

const WatchMovie=createStackNavigator(screens);

export default createAppContainer(WatchMovie);
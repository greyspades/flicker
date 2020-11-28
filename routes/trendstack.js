import React, { PureComponent } from 'react'
//import { Text, View } from 'react-native'
import Home from '../screens/home'
import SeriesDetails from '../screens/seriesdetails'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import SeriesHeader from '../components/seriesheader'
import Trending from '../screens/trending'
import Series from '../screens/series'
import Recommend from '../screens/recommend'



const screens={

    Home:{
        screen:Series,
        navigationOptions:({navigation})=>{
            return{
                headerTitle:()=><SeriesHeader navigation={navigation} />,
               
                headerStyle:{
                    backgroundColor:'maroon'
                }
            }
            
            headerStyle:{
                backgroundColor:'teal'
            }
        }  
    },
    

    SeriesDetails:{
        screen:SeriesDetails,
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
            headerStyle:{
                backgroundColor:'maroon',
                
            },
            headerTintColor:'white'
        }
    },
    

}

const SeriesStack=createStackNavigator(screens);

export default createAppContainer(SeriesStack);
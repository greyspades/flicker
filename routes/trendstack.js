import React, { PureComponent } from 'react'
//import { Text, View } from 'react-native'
import Home from '../screens/home'
import SeriesDetails from '../screens/seriesdetails'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import SeriesHeader from '../components/seriesheader'
import Trending from '../screens/trending'
import Series from '../screens/series'



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
            title:'SeriesDetails'
        }
    },
}

const SeriesStack=createStackNavigator(screens);

export default createAppContainer(SeriesStack);
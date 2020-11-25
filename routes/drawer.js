import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import Homestack from './stack'
//import Trending from '../screens/trending'
//import Trendingstack from './trendingstack'
import SeriesStack from './trendstack'
import Registration from '../screens/register'
import regStack from './regstack'
import Profile from '../screens/profile'


const Drawer=createDrawerNavigator({
    
    Movies:{
        screen:Homestack,
    },
    'Tv series' :{
        screen:SeriesStack,
    },
    'Log in':{
        screen:regStack
    },
    Reg:{
        screen:Registration
    },
    profile:{
        screen:Profile
    }
    
    
    
   
  
   

})

export default createAppContainer(Drawer)
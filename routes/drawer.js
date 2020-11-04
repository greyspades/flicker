import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import Homestack from './stack'
//import Trending from '../screens/trending'
//import Trendingstack from './trendingstack'
import SeriesStack from './trendstack'

const Drawer=createDrawerNavigator({
    
    Movies:{
        screen:Homestack,
    },
    Tv :{
        screen:SeriesStack,
    },
   
   

})

export default createAppContainer(Drawer)
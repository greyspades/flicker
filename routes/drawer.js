import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import Homestack from './stack'
//import Trending from '../screens/trending'
//import Trendingstack from './trendingstack'
import SeriesStack from './trendstack'
import Registration from '../screens/register'
import regStack from './regstack'
import Profile from '../screens/profile'
import Tab from './tab'
import WatchList from '../screens/watchlist'
import WatchTab from './watchtab'


const Drawer=createDrawerNavigator({
   
    'Home':{
        screen:Homestack
    },
    'Tv series' :{
        screen:SeriesStack,
    },
      
    profile:{
        screen:Profile
    },
    'Watch List':{
        screen:WatchTab
    }

},
{
    drawerBackgroundColor:'maroon',
    drawerWidth:150,
    contentOptions:{
        activeTintColor:'white',
        activeBackgroundColor:'purple',
        inactiveTintColor:'white'
    }
})

export default createAppContainer(Drawer)
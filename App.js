import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,FlatList,TouchableOpacity, Button,Alert} from 'react-native';
import Header from './components/header'
import Home from './screens/home'
import * as font from 'expo-font'
import Drawer from './routes/drawer'
import  Details from './screens/details'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import movieReducer from './redux/reducers/moviereducer'
import Homestack from './routes/stack'
import SeriesStack from './routes/trendstack'
import {enableScreens} from 'react-native-screens'


export default function App() {
  const [main,setmain]=useState([
    {task:'be awesome',difficulty:9,time:[7,30,7],key:1},
    {task:'build an app',difficulty:5,time:[11,0,7],key:4},
    {task:'design something',difficulty:6,time:[9,30,3],key:3}])
  const set=(e)=>{
    setmain({name2:e.target.value})
    e.preventDefault();
  }
  useEffect(()=>{
    //getapi()
  })

  const store=createStore(movieReducer)
  enableScreens()
 
  return (
    <View style={styles.container}>
      <Provider  store={store}>
        <Drawer />
      </Provider>

    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    //alignItems: 'center',
    //justifyContent: 'center',
    //padding:30,
  },
  other:{
    backgroundColor:'pink',
    padding:'20'
  },
  input:{
    backgroundColor:'maroon',
    margin:5,
    padding:8,
    width:200,

  },
  items:{
    backgroundColor:'blue',
    marginTop:20

  },
  thing:{
    marginTop:10,
  },
  talk:{
    backgroundColor:'pink',
    //flex:1

  }
});

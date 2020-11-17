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
import Placeholder from './components/loadingplaceholder'
import AnimatedSplash from 'react-native-animated-splash-screen'
import {connect} from'react-redux'

function App() {
  const [main,setmain]=useState(true)
  const set=(e)=>{
    setmain({name2:e.target.value})
    e.preventDefault();
  }
  useEffect(()=>{
    setTimeout(() => {
      setmain(false)
    }, 3000);
    
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
const mapToProps=(state)=>{
  return{
    splash:state.showSplash
  }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      hideSplash:()=>{dispatch({type:'CLOSE SPLASH',})},
      showSplash:()=>{dispatch({type:'SHOW SPLASH'})}
    }
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

export default App

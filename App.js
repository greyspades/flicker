import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,FlatList,TouchableOpacity, Button,Alert} from 'react-native';
import Header from './components/header'
import Home from './screens/home'
import * as font from 'expo-font'
import Drawer from './routes/drawer'
import  Details from './screens/details'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import movieReducer from './redux/reducers/moviereducer'
import Homestack from './routes/stack'
import SeriesStack from './routes/trendstack'
import {enableScreens} from 'react-native-screens'
import Placeholder from './components/loadingplaceholder'
import AnimatedSplash from 'react-native-animated-splash-screen'
import Video from './components/video'
import Registration from './screens/register'
import Spinner from 'react-native-loading-spinner-overlay';
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef} from './redux/navigator'
import { PersistGate } from "redux-persist/integration/react";
import {persistor,store} from './redux/reducers/localreducer'
//import Tab from './routes/Tab'
import LogIn from './screens/login'


function App() {
  const [main,setmain]=useState(false)
  const set=(e)=>{
    setmain({name2:e.target.value})
    e.preventDefault();
  }
  useEffect(()=>{
   setTimeout(() => {
     setmain(true)
   }, 3000);
    
  })

  //const mainstore=createStore(movieReducer,applyMiddleware(thunk))
  enableScreens()
 
  return (
    <View style={styles.container}>
    
    <Provider  store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <AnimatedSplash
          transluscent={true}
          isLoaded={main}
          backgroundColor={'black'}
          logoImage={require(('./assets/logo.jpg'))}
          logoHeight={'100%'}
          logoWidth={'100%'}
          >
         <NavigationContainer>
           
         <Drawer />
        
         </NavigationContainer>
          </AnimatedSplash>
      </PersistGate>     
      
       
      </Provider>
    

    </View> 
  );
  
}
const mapState=(state)=>{
  return{
    splash:state.showSplash
  }
}

const mapDispatch=(dispatch)=>{
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

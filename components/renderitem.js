import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator } from 'react-native'
import Details from '../screens/details'
import {AfterInteractions} from 'react-native-interactions'
import {StackActions, NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay';


const Renderitem=(props)=>{
    const [spin,setSpin]=useState(false)
        const resetAction=StackActions.reset({
            index:0,
            actions:[NavigationActions.navigate({routeName:'Details'})]
        })
        
        function handleTouch(){
            props.navigation.navigate('Details',props.item)
            
            setTimeout(() => {
                setSpin(false)
            }, 3000);
        }
    
        return(
            <View>
             <Spinner
          visible={spin}
          textContent={'Loading...'}
          color='maroon'
          size={'large'}
          
          
        />
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Details',props.item)}}>
            <Card poster={props.item.poster_path} title={props.item.title} date={props.item.release_date} series_date={props.item.first_air_date}>

            </Card>

            </TouchableOpacity>
               
            
            </View>
                       
)
}

export default React.memo(Renderitem)

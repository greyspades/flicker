import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator } from 'react-native'
import Details from '../screens/details'
import {AfterInteractions} from 'react-native-interactions'
import {StackActions, NavigationActions} from 'react-navigation'

const Renderitem=(props)=>{
    /*const [main,setmain]=useState({
        defer:false
    })
    
    useEffect(()=>{
        InteractionManager.runAfterInteractions(()=>{
            setmain({defer:true})
        })
    })*/

    //const navigate=useCallback(()=>navigation.navigate('Details', item),[item])

    
    /*if(main.defer){
            return(
                <Text style={{color:'white'}}>loading....</Text>
            )
        }*/
        const resetAction=StackActions.reset({
            index:0,
            actions:[NavigationActions.navigate({routeName:'Details'})]
        })
    
        return(
            <View>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Details',props.item)}}>
            <Card poster={props.item.poster_path} title={props.item.title} date={props.item.release_date} series_date={props.item.first_air_date}>

            </Card>

            </TouchableOpacity>
               
            
            </View>
                       
)
}

export default React.memo(Renderitem)

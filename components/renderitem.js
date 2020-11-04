import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator } from 'react-native'
import Details from '../screens/details'
import {AfterInteractions} from 'react-native-interactions'

const Renderitem=({item,navigation})=>{
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
    
        return(
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate('Details',item)}>
            <Card poster={item.poster_path} title={item.title} date={item.release_date} series_date={item.first_air_date}>

            </Card>

            </TouchableOpacity>
               
            
            </View>
                       
)
}

export default React.memo(Renderitem)

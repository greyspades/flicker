import React, {useState,useEffect}from 'react';
import {StyleSheet,Text,View,ImageBackground,TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import Mybutton from '../shared/button'


const Overview=(props)=>{
    const [display,setdisplay]=useState(true)
    const [open,setopen]=useState({
        show:400,
    })

    const show=()=>{
        if(display){
            return(<View style={styles.over}>
                 <Text style={styles.overview}>{props.overview}</Text>
                 
                </View>)
        }
    }
    const close=()=>{
        setdisplay(false)
    }

    const toggle=()=>{
        if(!display){setdisplay(true)}
        else{
            setdisplay(false)
        }
        
    }
    return(
        <View>

            {show()}
          
        </View>
    )
}

const styles=StyleSheet.create({
    overview:{
        fontSize:20,
        color:'white',
        opacity:2,
        marginLeft:15
        //backgroundColor:'black'
      },
   
  
})
export default Overview
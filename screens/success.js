import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator, Button,TextInput, SegmentedControlIOSBase } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import {connect} from 'react-redux'
import {AntDesign} from '@expo/vector-icons'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { Navigation } from 'react-native-navigation';
import Axios from 'axios'

const Success=(props)=>{
    const [main,setmain]=useState()

    return(
        <View style={{backgroundColor:'black',height:800}}>
            <LinearGradient   colors={["maroon", "maroon", "purple"]}
        style={{width:300,height:300,backgroundColor:'maroon',marginHorizontal:wp('8'),
        borderRadius:10,marginTop:wp('40%'),justifyContent:'center'}}>
            <Text style={{fontSize:30,color:'white',padding:10,textAlign:'center',marginTop:wp('-20%')}}>
                registration 
            </Text>
            <Text style={{fontSize:30,color:'white',padding:10,textAlign:'center'}}>
                complete
            </Text>
            <TouchableOpacity onPress={()=>{
                props.navigation.replace('Login')
                
            }}>
            <AntDesign name="home" size={40} color="white" style={{textAlign:'center',marginTop:wp('10%')}} />
            </TouchableOpacity>
       


            </LinearGradient>
        </View>
    )
}
const mapState=(state)=>{
    return {
        info:state.info
    }
}
const mapDispatch=(dispatch)=>{
    return {
        logIn:(item)=>{dispatch({type:'LOG IN',user:item})}
    }
}
const styles=StyleSheet.create({

})
export default connect(mapState,mapDispatch) (Success)

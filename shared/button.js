import React ,{useState,usEffect} from 'react'
import { Text, View,Button,Alert,StyleSheet,Image,ScrollView,ImageBackground,TouchableOpacity } from 'react-native'

const Mybutton=(props)=>{
    return(
        <View
        style={styles.button}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    button:{
        width:100,
        height:50,
        backgroundColor:'white',
        borderLeftColor:'gray',
        borderRadius:10,
        borderWidth:10,
        
        
    },
    text:{
        fontSize:20,
    }
})

export default Mybutton
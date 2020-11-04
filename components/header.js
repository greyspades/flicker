import React, { Component,useContext,useState} from 'react'
import { Text, View,FlatList,StyleSheet } from 'react-native'
import {Mycontext} from './taskcontext'
import {MaterialIcons} from '@expo/vector-icons'

const Header=({item})=>{
    //const [main,setmain]=useContext(Mycontext)
   
        return (
            <View style={styles.container}>
                <Text style={styles.thing}>you have to {item.task} </Text>
                <MaterialIcons name={'delete'} size={25} />

            </View>
        )
    }

    const styles=StyleSheet.create({
        thing:{
            margin:10,
            backgroundColor:'coral',
            borderRadius:7,
            flex:3,
            padding:10,

        },
        diff:{
            margin:10,
            backgroundColor:'teal',
            padding:10,
            borderRadius:7,
            flex:1


        },
        container:{
            //padding:20,
            flex:1,
            flexDirection:"row"
            
        }
    })


export default Header;
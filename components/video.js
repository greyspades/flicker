
import YoutubePlayer from "react-native-youtube-iframe";
import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,Button,TouchableOpacity,InteractionManager,ActivityIndicator,TextInput } from 'react-native'

const Video=(props)=>{
    return(
        <View>
         <Text>he there</Text>
    <Text>its {props.navigation.getParam('title')}</Text>

        </View>
    )
}
export default Video
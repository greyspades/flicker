import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator, Button,TextInput, SegmentedControlIOSBase } from 'react-native'
import Axios from 'axios'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Navigation } from 'react-native-navigation'
import {connect} from 'react-redux'
import Success from './success'

const Register=(props)=>{
    const [main,setmain]=useState()

    return(
        <View>
             <LinearGradient  colors={["maroon", "maroon", "purple"]}
        style={{width:300,height:600,backgroundColor:'maroon',marginHorizontal:wp('8'),
        borderRadius:10,marginTop:wp('30%'),}}>
            <Text>recommend to a friend</Text>
        </LinearGradient>
        </View>
    )
}
const mapState=(state)=>{
    return {

    }
}

export default connect(mapState) (Register)
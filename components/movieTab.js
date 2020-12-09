import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,Alert, Button,TextInput, SegmentedControlIOSBase } from 'react-native'
import Axios from 'axios'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import Tab from '../routes/Tab'

const Movies=()=>{

    return (
        <View>
            <Text>
                <Tab />
            </Text>
        </View>
    )
}
export default Movies
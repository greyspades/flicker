import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { AsyncStorage,Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator,TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'


// RootNavigation.js



export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them
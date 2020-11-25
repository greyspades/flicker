import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,Button,TouchableOpacity,InteractionManager,ActivityIndicator,TextInput } from 'react-native'
import Details from '../screens/details'
import {AfterInteractions} from 'react-native-interactions'
import {StackActions, NavigationActions} from 'react-navigation'
import Axios from 'axios'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons'
import {Ionicons} from '@expo/vector-icons'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import { FlatList } from 'react-native-gesture-handler'

const Profile=(props)=>{
    const [main,setmain]=useState({})
    const [loaded,setLoaded]=useState(false)
    

    useEffect(()=>{
      let mounted=true
      if(mounted){
        Axios.get(`http://192.168.43.62:5000/get_user/${'Grey'}`)
        .then((res)=>{
            console.log(res.data)
            setmain(res.data)
            
        })
      }
      return ()=>{
          mounted=false
      }
    },[])

    const showGenres=()=>{
        if(main.genres){
            return (
              <View style={{backgroundColor:'#1f1f1f',borderRadius:20,justifyContent:'center',padding:10}}>
                  <Text style={{color:'white',fontSize:20}}>{main.genres.map((item)=>(<Text style={{margin:wp('10%'),textAlign:'center'}}>{item} ,</Text>))}</Text></View>

            )
        }
    }

    const showProfile=()=>{
        if(props.isLoged){
            return(
                <View >
                <LinearGradient  colors={["maroon", "maroon", "purple"]}
          style={{width:300,height:700,backgroundColor:'maroon',marginHorizontal:wp('8'),
          borderRadius:10,marginTop:wp('10%'),padding:10}}>
              <AntDesign name="picture" size={200} color="white" style={{marginHorizontal:wp('14%')}} />
  
      <Text style={{color:'white',fontSize:25}}>Username:{main.username}</Text>
      {showGenres()}
      <View>
       <FlatList 
       data={props.info.friends}
       />
      </View>
      

      <Button title='log' onPress={()=>{console.log(props.info)}}/>

      
          
          </LinearGradient>
  
          </View>
            )
        }
        else {
            return (
                <View>
                     <LinearGradient  colors={["maroon", "maroon", "purple"]}
          style={{width:300,height:300,backgroundColor:'maroon',marginHorizontal:wp('8'),
          borderRadius:10,marginTop:wp('10%'),padding:10}}>
              <Text style={{color:'white',textAlign:'center',fontSize:40}}>Please log in</Text>
              <TouchableOpacity onPress={handleSubmit}>
                            <LinearGradient
                            colors={["purple",'black']}
                            style={{width:80,height:40,backgroundColor:'maroon',marginHorizontal:wp('30%'),
                            borderRadius:10,marginTop:wp('2%'),shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,  
                            elevation: 5}}
                          >
                                <Text style={{color:'white',textAlign:'center',padding:5,fontSize:17}}>
                                    Log in
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
          </LinearGradient>
                </View>
            )
        }
    }

    return(
        <View>
            <Button title='log' onPress={()=>{console.log(main)}} />
            {showProfile()}
          
        </View>
    )
}
const mapState=(state)=>{
    return {
        isLoged:state.isLogedIn,
        info:state.userInfo
    }
}

const mapDispatch=()=>{
    return {

    }
}
export default connect(mapState,mapDispatch) (Profile)
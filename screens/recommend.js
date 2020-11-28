import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,Alert,InteractionManager,ActivityIndicator, Button,TextInput, ScrollView} from 'react-native'
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
import AwesomeAlert from 'react-native-awesome-alerts';
import { useScreens } from 'react-native-screens'

const Register=(props)=>{
    const [user,setUser]=useState()
    const [show, setShow]=useState(false)
    const [mounted, setMounted]=useState(false)
    const [alert,setAlert]=useState(false)

    const showFriends=()=>{
        let info=props.navigation.getParam('friends')
        if(Array.isArray(props.info.friends) && props.info.friends.length){
            info.friends.map((item)=>{
                <TouchableOpacity>
                    <Text>
                        {item}
                    </Text>
                </TouchableOpacity>
            })
        }
    }
    var title=props.navigation.getParam('title')
    var seriesTitle=props.navigation.getParam('name')
   
    function recommend(friend){
    let title=props.navigation.getParam('title')
    let seriesTitle=props.navigation.getParam('name')
    let type=props.navigation.getParam('type')
        
            let item={
                user:props.info.username,
                friend:friend,
                title:title,
                type:type,
            }
         //let canceled=false
         //if(!canceled){
            Axios.post(`https://flickmeet-1.herokuapp.com/recommend`,{item})
            .then((res)=>{
                if(res.data=='RECOMMENDED'){
                    //setAlert(true)
                    createTwoButtonAlert()
                    
                }
            })
            console.log(item)
         //}
        
        }
        const closeAlert=()=>{
            setAlert(false)
        }
        useEffect(()=>{
            let mounted=true
            if(mounted){
              Axios.get(`https://flickmeet-1.herokuapp.com/${props.info.username}`)
              .then((res)=>{
                  console.log(res.data)
                    setUser(res.data)
                    setMounted(true)
              })
            }
            return ()=>{
                mounted=false
            }
           
          },[])
      const showfriend=()=>{
          if(mounted){
              return(
                  <View>
            <ScrollView>
              {user.friends.map((item)=>(
                  <View>
                       <TouchableOpacity style={{marginVertical:wp('5%')}} onPress={()=>{recommend(item)}}>
                   <Text style={{color:'white',fontSize:30,textAlign:'center'}}>
                       {item}
                   </Text>
               </TouchableOpacity>
                  </View>
              ))}
           </ScrollView>
                  </View>
              )
          }
      }
      const createTwoButtonAlert = () =>
      Alert.alert(
        "Recomended",
        "you have successfuly recomended this item",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    return(
        <View style={{backgroundColor:'black'}}>
              <AwesomeAlert
          show={alert}
          showProgress={false}
          title="recommended"
         
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
        
          showConfirmButton={true}
          
          confirmText='Cancel'
          confirmButtonColor="maroon"
          
          onConfirmPressed={() => {
            closeAlert()
            
          }}
        />
             <LinearGradient  colors={["maroon", "maroon", "purple"]}
        style={{width:300,height:600,backgroundColor:'maroon',marginHorizontal:wp('8'),
        borderRadius:10,marginTop:wp('10%'),}}>
        {showfriend()}
        </LinearGradient>
     
        </View>
    )
}
const mapState=(state)=>{
    return {
        info:state.userInfo,
        movies:state.movies
    }
}
const mapDispatch=(dispatch)=>{
    return {
        setUser:(item)=>{dispatch({type:'LOG IN',user:item})}
    }
}

export default connect(mapState,mapDispatch) (Register)
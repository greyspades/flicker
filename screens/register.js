import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,TouchableOpacity,InteractionManager,Alert, Button,TextInput, SegmentedControlIOSBase } from 'react-native'
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
import Spinner from 'react-native-loading-spinner-overlay';



const Registration
=(props)=>{
    const [main,setmain]=useState({})
    const [password,setPassword]=useState()
    const [secure,setSecure]=useState(true)
    const [icon,setIcon]=useState('ios-eye-off')
    const [genre,setGenre]=useState([])
    const [spin,setSpin]=useState(false)

    /*useEffect(()=>{

        let mounted=false
        if(!mounted){
            Axios.get('http://192.168.43.62:5000/test')
            .then((res)=>{
                console.log(res.data)   
            })
        }
        return ()=>{
            mounted=true
        }
    })*/
    const changeIcon=()=>{
        /*if(secure){
            setSecure(false)
        }
        else{
            setSecure(true)
        }*/
        //setSecure(false)
        console.log('gundyr')
        
    }

    const showEye=()=>{
        if(!secure){
            return (
                <View>
                     <Ionicons name={'ios-eye'} size={40} color="white" style={{marginHorizontal:wp('37%'),marginVertical:wp('5%')}}
                            onPress={()=>{if(!secure){
                                setSecure(true)
                            }}}
                            />
                </View>            
            )
        }
        else {
            return (
                <View>
                 <Ionicons name={'ios-eye-off'} size={40} color="white" style={{marginHorizontal:wp('37%'),marginVertical:wp('5%')}}
                onPress={()=>{
                    if(secure){
                        setSecure(false)
                    }}}
                   
                  />
                </View>

            )
        }
    }
    const registerUser=()=>{

    }
    const showAlert = () =>
    Alert.alert(
      "Recomended",
      "My Alert Msg",
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
   
    let controler
    return (
        <View style={{justifyContent:'center',backgroundColor:'black',height:800}}>

                             <Spinner
          visible={spin}
          textContent={'Loading...'}
          color='white'
          size={'large'}
          textStyle={{color:'white'}}
          
          
        />
            <LinearGradient
        colors={["maroon", "maroon", "purple"]}
        style={{width:300,height:600,backgroundColor:'maroon',marginHorizontal:wp('8'),
        borderRadius:10,marginTop:wp('-25%'),}}
      >
                                  <AntDesign style={{marginBottom:40,marginLeft:wp('5%')}} name='close' size={40} color='white' onPress={()=>{props.navigation.push('Home')}}/>
        <Formik initialValues={{username:'',mail:'',password:'',genre:[]}}  onSubmit={(values,event)=>{
                    let user={
                        username:values.username,
                        mail:values.mail,
                        password:values.password,
                        genres:genre
                    }
                    setSpin(true)
                Axios.post(`https://flickmeet-1.herokuapp.com/add_user`,{user})
                .then((res)=>{
                   if(res.data=='SAVED'){
                      
                        props.navigation.replace('success',{name:values.username})
                        setSpin(false)

                    }
                    else if(res.data=='THAT USERNAME IS TAKEN'){
                        setSpin(false)
                        showAlert()
                    }
                    
                })
        }}>
               {({handleChange,handleBlur,handleSubmit,values})=>((
                   <View>
                       
                        <Text style={{color:'white',fontSize:25,marginHorizontal:wp('27%'),marginTop:wp('-15%')}}>Register</Text>
                        <TextInput style={{width:250,height:30,marginHorizontal:wp('7%'),
                        color:'white',fontSize:20,marginTop:wp('10%')

                        }}
                        
                        onChangeText={handleChange('username')} value={values.username}
                        
                        selectionColor='white'
                        textAlign={'center'}
                        placeholder='Username'
                        allowFontScaling={true}/>
                        <View style={{width:250,height:5,backgroundColor:'white',marginHorizontal:wp('7%'),
                    opacity:0.5,borderRadius:2}}></View>
                     <TextInput style={{width:250,height:30,marginHorizontal:wp('7%'),
                        color:'white',fontSize:20,marginTop:wp('15%')
                        
                        }}
                        
                        onChangeText={handleChange('mail')} value={values.mail}
                        
                        selectionColor='white'
                        textAlign={'center'}
                        placeholder='Email address'
                        allowFontScaling={true}/>
                        <View style={{width:250,height:5,backgroundColor:'white',marginHorizontal:wp('7%'),
                    opacity:0.5,borderRadius:2}}></View>
                    <View style={{flex:1}}>
                    <TextInput style={{width:200,height:30,marginHorizontal:wp('14%'),
                        color:'black',fontSize:20,marginTop:wp('15%'),backgroundColor:'white'
                        ,borderRadius:10
                        }}
                        autoCapitalize={"none"}
                        onChangeText={handleChange('password')} value={values.password}
                        secureTextEntry={secure}
                        selectionColor='black'
                        textAlign={'center'}
                        placeholder='Password'
                        allowFontScaling={secure}/>
                        {showEye()}
                        
                    </View>
                      <View style={{marginVertical:wp('40%')}}>
                          <Text style={{color:'white',fontSize:20,marginHorizontal:wp('20%'),marginTop:wp('3%')}}>Pick your genres</Text>
                     <DropDownPicker items={[
                            {label: 'Action', value: 'action'},
                            {label: 'Adventure', value: 'adventure'},
                            {label: 'Comedy', value: 'comedy'},
                            {label: 'Drama', value: 'drama'},
                            {label: 'Fantasy', value: 'fantasy'},
                            {label: 'Horror', value: 'horror'},
                            {label: 'Romance', value: 'romance'},
                            {label: 'Science fiction', value: 'science fiction'},
                            {label: 'Thriller', value: 'thriller'},
                          ]} 
                            multiple={true}
                            value={values.genre}
                            onChangeItem={(item)=>{
                                setGenre(item)
                                
                            }}
                            
                            placeholder='select your genres'
                            defaultValue={values.genre}
                            containerStyle={{height:30,width:250,marginHorizontal:wp('7%'),marginTop:wp('3')}}
                            dropDownStyle={{backgroundColor: 'black'}}
                            itemStyle={{justifyContent: 'flex-start|flex-end|center'}}
                            itemStyle={{
                                justifyContent: 'flex-start', 
                            }}
                            labelStyle={{
                                fontSize: 14,
                                textAlign: 'left',
                                color: 'white'
                            }}
                            selectedtLabelStyle={{
                                color: 'maroon'
                            }}
                            placeholderStyle={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color:'black'
                            }}
                            activeLabelStyle={{color: 'maroon'}}
                        />
                        <TouchableOpacity onPress={handleSubmit}>
                            <LinearGradient
                            colors={["purple",'black']}
                            style={{width:80,height:40,backgroundColor:'maroon',marginHorizontal:wp('30%'),
                            borderRadius:10,marginTop:wp('10%'),shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,  
                            elevation: 5}}
                          >
                                <Text style={{color:'white',textAlign:'center',padding:5,fontSize:17}}>
                                    join
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                      </View>
                   </View>
               ))} 
        </Formik>
        
      
      </LinearGradient>

          
         {/*} <View style={{width:300,height:500,backgroundColor:'maroon',marginHorizontal:wp('8'),
            borderRadius:10,marginTop:wp(20),
        }}>

    </View>*/}
        </View>
    )
}
const matchProps=(state)=>{
    return {
        isLoggedIn:state.isLogged
    }
}
const mapDispatch=(dispatch)=>{
    return {
        logIn:()=>{dispatch({type:'LOG IN'})}
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: { 
      padding: 15, 
      alignItems: "center", 
      borderRadius: 5 
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    }
})   
export default connect(matchProps,mapDispatch) (Registration)

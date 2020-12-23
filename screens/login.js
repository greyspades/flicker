import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { AsyncStorage,Text, View,StyleSheet,TouchableOpacity,InteractionManager,ActivityIndicator,TextInput, Button } from 'react-native'
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
import Spinner from 'react-native-loading-spinner-overlay';
import {logIn} from '../redux/reducers/actions'
import {getStorage} from '../redux/reducers/actions'



const LogIn=(props)=>{
    const [main,setmain]=useState()
    const [secure,setSecure]=useState(true)
    const [alert,setAlert]=useState(false)
    const [spin,setSpin]=useState(false)

    useEffect(()=>{
       getData()
       
    },[])
    
const getData=async(dispatch)=>{
    const userAge = await AsyncStorage.getItem("key")
    let info=JSON.parse(userAge)
   let user={
       username:info.name,
       password:info.password
   }
   if(userAge != null){
    Axios.post(`https://flickmeet-1.herokuapp.com/log_in`,{user})
    .then( (res)=>{
        //console.log(res.data.info)
        //console.log(user)
        props.setUser(res.data.info)
        props.navigation.replace('Home')
    })
   }
 
            //props.logIn(res.data)
                
            //props.navigation.navigate('Home')
              //console.log(user)
            
   }
   const getUser=()=>{
       return ()=>{
           console.log('metro')
       }
   }
   const log=()=>{
    props.navigation.navigate('Home')
   }
    const storeData=async(name,password)=>{
       
      
        let thing={
            name:name,
            password:password,
        }
        let payload=JSON.stringify(thing)
        try {
            await AsyncStorage.setItem(
              "key",
              payload
            );
            console.log('saved')
          } catch (error) {
            // Error saving data
            
          }
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
    const hideAlert=()=>{
        setAlert(false)
    }
    const showAlert=()=>{
        setAlert(true)
    }
    
    const enter=()=>{
        
    }
    
    return(
        <View style={{backgroundColor:'black',height:800,flex:1,alignItems:'center'}}>
                        <Spinner
          visible={spin}
          textContent={'Loading...'}
          color='white'
          size={'large'}
          textStyle={{color:'white'}}
          
          
        />
       
            <LinearGradient  colors={["maroon", "maroon", "purple"]}
        style={{width:300,height:600,backgroundColor:'maroon',flex:1,alignItems:'center',
        borderRadius:10,marginTop:wp('15%'),}}>

            <Formik initialValues={{username:'',password:''}} onSubmit={(values)=>{
                let user={
                    username:values.username.toLowerCase(),
                    password:values.password,
                }
                setSpin(true)
                   Axios.post(`https://flickmeet-1.herokuapp.com/log_in`,{user})
                   .then((res)=>{
                    if(res.data.status=='LOG IN'){
                        props.logIn(res.data)
                        storeData(res.data.info.username,res.data.info.password)
                        //localStorage.setItem("persist", JSON.stringify(res.data));
                        //console.log(res.data)
                        setSpin(false)
                        props.navigation.navigate('Tab',{screen:Tab})


                    }
                    else if(res.data.status=='WRONG DETAILS'){
                       setAlert(true)
                       setSpin(false)
                    }
                       
                   })
            }}>
                {({handleChange,handleBlur,handleSubmit,values})=>(
                    (
                        <View style={{flex:1,alignItems:'center'}}>
                            <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Invalid credentials"
          message=" The username or password is incorrect"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
        
          showConfirmButton={true}
          
          confirmText='Cancel'
          confirmButtonColor="maroon"
          onCancelPressed={() => {
            hideAlert
          }}
          onConfirmPressed={() => {
            setAlert(false)
          }}
        />
                            <Text style={{color:'white',fontSize:30,textAlign:'center'}}>Log in</Text>
                        <TextInput style={{width:250,height:30,
                        color:'white',fontSize:20,marginTop:wp('10%')

                        }}
                        
                        onChangeText={handleChange('username')} value={values.username}
                        
                        selectionColor='white'
                        textAlign={'center'}
                        placeholder='Username'
                        allowFontScaling={true}/>
                          <View style={{width:250,height:5,backgroundColor:'white',marginHorizontal:wp('7%'),
                    opacity:0.5,borderRadius:2}}></View>
                         <TextInput style={{width:200,height:30,
                        color:'black',fontSize:20,marginTop:wp('15%'),backgroundColor:'white'
                        ,borderRadius:10
                        }}
                        
                        onChangeText={handleChange('password')} value={values.password}
                        secureTextEntry={secure}
                        selectionColor='black'
                        textAlign={'center'}
                        placeholder='Password'
                        autoCapitalize={"none"}
                        allowFontScaling={secure}/>
                        
                        {showEye()}
                        <TouchableOpacity onPress={handleSubmit}>
                            <LinearGradient
                            colors={["purple",'black']}
                            style={{width:80,height:40,backgroundColor:'maroon',
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
                        <TouchableOpacity onPress={()=>{props.navigation.replace('Register')}}>
                        <Text style={{color:'white',fontSize:15,textAlign:'center',marginTop:wp('5%')}}>register</Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                    )
                )}

            </Formik>

            </LinearGradient>
        </View>
    )

}
const mapState=(state)=>{
    return {
        logedIn:state.isLogedIn,
        userInfo:state.userInfo,
        storage:state.storage,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        logIn:(user)=>{dispatch(logIn(user))},
        setUser:(item)=>{dispatch({type:'SET USER',user:item})},
        getStorage:(user)=>{dispatch(getStorage(user))}
    }
}
export default connect(mapState,mapDispatch) (LogIn)

import React,{useState} from 'react';
import {StyleSheet,Text,View,TouchableWithoutFeedback,Modal, TouchableOpacity,TextInput} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
//import { Directions } from 'react-native-gesture-handler';
//import { NavigationActions } from 'react-navigation';
import Searchbar from '../components/search'
import {AntDesign} from '@expo/vector-icons'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';
import {connect} from 'react-redux'
import { setStatusBarHidden } from 'expo-status-bar';
import {LinearGradient} from 'expo-linear-gradient'
import {FontAwesome} from '@expo/vector-icons'
import Axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

const Header=(props)=>{
    const [search, setsearch]=useState(false)
    const [clear,setclear]=useState(false)
    const [showAdd,setShowAdd]=useState(false)
    const [showAlert,setShowAlert]=useState()
    const [error,setError]=useState(false)

    const openmenu=()=>{
        props.navigation.openDrawer()
    }

    const opensearchbar=()=>{

        //setsearch(false)
        if(search){
            setsearch(false)
        }
        else if(!search){setsearch(true)}
        setclear(true)

    }
    const showDot=()=>{
        if(props.loged){
            return (
                <Entypo name="dot-single" size={50} color="green" style={{marginLeft:wp('13%'),}} />
            )
        }
    }
    const addUser=()=>{
    
            return (
                <View style={{flex:1,flexDirection:'row'}}>
                    <Modal visible={showAdd} transparent={true} style={{marginBottom:wp('-20%')}}>
                            <View style={{backgroundColor:'black'}}>
                            <TouchableOpacity style={{marginLeft:wp('3%'),marginTop:wp('1%')}} onPress={()=>{setShowAdd(false)}}>
                            <AntDesign  name='close' size={30} color='white'/>
                            </TouchableOpacity>
               
                            <LinearGradient   colors={["black", "black", "black",'maroon']}
            style={{width:wp('85%'),height:wp('15%'),backgroundColor:'maroon',marginHorizontal:wp('7%'),
            borderRadius:10,marginTop:wp('-1%'),justifyContent:'center'}}>

                <Formik initialValues={{user:''}} onSubmit={(values)=>{
                    let item={
                        username:props.info.username,
                        search:values.user.toLowerCase(),
                    }
                    //let person=values.user
                    Axios.post(`https://flickmeet-1.herokuapp.com/send_friend_request`,{item})
                    .then((res)=>{
                        if(res.data=='REQUEST SENT'){
                            setShowAlert(true)
                        }
                        else if(res.data=='USER NOT FOUND'){
                            setError(true)
                        }
                    })

                }}>
                    {({handleChange,handleBlur,handleSubmit,values})=>(
                        <View style={{flex:1,flexDirection:'row'}}>
                             <TextInput style={{width:wp('60%'),height:wp('10%'),fontSize:wp('5%'),marginLeft:wp('10%'),backgroundColor:'black',color:'white'}}
                  placeholder='search username'
                  textAlign={'center'}
                  onChangeText={handleChange('user')} value={values.user}
                        
                  selectionColor='white' />
                   <MaterialIcons name='search' size={35} 
            onPress={handleSubmit} style={{color:'white',marginLeft:wp('3%'),marginTop:wp('2%')}}/>
                   
                        </View>
                    )}  

                </Formik>
              
            </LinearGradient>
                            </View>
                    </Modal>
                </View>
            )
        
    }
    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={45} onPress={openmenu} style={styles.icon} />
            {showDot()}
            
            <View style={styles.heading}>
            <Text style={styles.headertext}>Movies</Text>
            </View>
            
            <TouchableOpacity onPress={()=>{setShowAdd(true)}} style={{width:40,height:40,marginTop:wp('2%'),marginLeft:wp('10%')}}>
            <AntDesign name=    "adduser" size={40} color="white" />
            </TouchableOpacity>
            {addUser()}

            <MaterialIcons name='search' size={40} 
            onPress={opensearchbar} style={{color:'white',marginLeft:wp('8%'),marginTop:wp('2%')}}/>
            <View>
            <Searchbar  toggleSearch={search} method={opensearchbar} clear={clear} navigation={props.navigation} />
            </View>
            <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="friend request sent"
         
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
        
          showConfirmButton={true}
          
          confirmText='Cancel'
          confirmButtonColor="maroon"
          onCancelPressed={() => {
            setShowAlert(false)
            
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
            setShowAdd(false)
          }}
        />
        <AwesomeAlert
          show={error}
          showProgress={false}
          title='User does not exist'
         
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
        
          showConfirmButton={true}
          
          confirmText='Cancel'
          confirmButtonColor="maroon"
          onCancelPressed={() => {
            setError(false)
            
          }}
          onConfirmPressed={() => {
            setError(false)
            setShowAdd(false)
          }}
        />
            

        </View>
    )
}
const mapState=(state)=>{
    return {
        loged:state.isLogedIn,
        info:state.userInfo
    }
}

const styles=StyleSheet.create({
    header:{
        flex:1,
        width:'100%',
        height:'100%',
        flexDirection:'row',
        
        //alignItems:'center',
        //justifyContent:'center',
        //backgroundColor:'maroon',
       
    },
    headertext:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
    },
    icon:{
        position:'absolute',
        left:1,
        color:'white',
        marginLeft:wp('-4%'),
        marginTop:wp('1%')
        //marginBottom:wp('10%')
    },
    heading:{
        justifyContent:"center",
        textAlign:"center",
        marginLeft:wp('8%'),

     

    }
})
export default connect(mapState) (Header)
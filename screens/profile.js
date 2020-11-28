import React, {useCallback,useEffect,useState, Component } from 'react'
import Card from '../shared/card'
import { Text, View,StyleSheet,Button,TouchableOpacity,InteractionManager,ActivityIndicator,TextInput,ScrollView,FlatList,ListView} from 'react-native'
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

import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";



const Profile=(props)=>{
    const [main,setmain]=useState({})
    const [loaded,setLoaded]=useState(false)
    

    useEffect(()=>{
      let mounted=true
      if(mounted){
        Axios.get(`http://192.168.43.62:5000/get_user/${props.info.username}`)
        .then((res)=>{
            setmain(res.data)
            setLoaded(true)

        })
      }
      return ()=>{
          mounted=false
      }
      /*Axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=naruto&type=video&key=AIzaSyBRbNi_0O6YRKckuLbK4XWUKfegdDBFvjo')
      .then((res)=>{
          console.log(res.data)
      })*/
    },[])

    const showGenres=()=>{
        if(main.genres){
            return (
              <View style={{backgroundColor:'#1f1f1f',borderRadius:20,justifyContent:'center',padding:10,marginVertical:15}}>
                  <Text style={{color:'white',fontSize:20}}>{main.genres.map((item)=>(<Text style={{margin:wp('10%'),textAlign:'center'}}>{item} ,</Text>))}</Text></View>

            )
        }
    }
    const showRecomend=()=>{
        if(loaded){
           return(
          <View>
                <Text style={{fontSize:30,color:'white'}}>Recomendations</Text>
                <View style={{backgroundColor:'black'}}>{  main.recommendations.map((item)=>(
              <View style={{marginBottom:wp('5'),flex:1,flexDirection:'row',backgroundColor:'black',height:40,borderRadius:10,width:200}}>
                <TouchableOpacity style={{backgroundColor:'blue',width:80,padding:6}}>
                    <Text style={{color:'white',textAlign:'center',padding:4}}>{item.name}</Text>
                </TouchableOpacity>
                 
                    <TouchableOpacity onPress={()=>{
                            if(item.type=='movie'){
                                Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&query=${item.item}&page=1&include_adult=false`)
                                .then((res)=>{
                                    let items=res.data.results[0]
                                          props.navigation.navigate('Details',items)
                                          //console.log(res.data.results[0])
                                })
                            }
                            else if(item.type=='series'){
                                Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&query=${item.item}&page=1&include_adult=false`)
                                .then((res)=>{
                                    let items=res.data.results[0]
                                          props.navigation.navigate('SeriesDetails',items)
                                          //console.log(res.data.results[0])
                                })
                            }
                      
                }} >
                    
                    <LinearGradient style={{borderBottomWidth:3,
                    width:wp('78%'),borderLeftWidth:3,borderRightWidth:3,borderTopWidth:3,borderColor:'maroon',
                    height:40,padding:6}} colors={['black','black','maroon']}>
                    <Text style={{textAlign:'center',color:'white'}}>{item.item}</Text>
                    </LinearGradient>
                </TouchableOpacity>
              </View>
         ))}</View>
          </View>
           )
        }
    }

    const showProfile=()=>{
        if(props.isLoged){
            return(
                <View >
              <ScrollView>

              <AntDesign name="picture" size={200} color="white" style={{marginHorizontal:wp('14%')}} />
  
      <Text style={{color:'white',fontSize:25}}>Username:{main.username}</Text>
      {showGenres()}
      <View>
        <View >
          
        {showRecomend()}
                
                <Text>seper fi</Text>
        </View>

      </View>
      


      
          
          
  
              </ScrollView>
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
            <ScrollView>
            <LinearGradient  colors={["maroon", "maroon", "purple"]}
          style={{width:wp('100%'),height:1000,backgroundColor:'maroon',
          borderRadius:10,padding:10}}>
           
            {showProfile()}

            </LinearGradient>
            </ScrollView>
          

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
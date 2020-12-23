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
import {SectionGrid,FlatGrid} from 'react-native-super-grid'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";
import SeriesCard from '../shared/seriescards'
import { FontAwesome } from '@expo/vector-icons';
import SkeletonContent from 'react-native-skeleton-content';


const WatchList=(props)=>{
    const [main,setmain]=useState([])
    const [series,setseries]=useState([])
    const [other,setOther]=useState([])

    var movieList =[]
    var seriesList=[]
    useEffect(()=>{
        /*Axios.get(`https://flickmeet-1.herokuapp.com/get_user/${props.info.username}`)
        .then((res)=>{
            setmain(res.data)
            

        })*/
        let canceled=true
        if(canceled){
            props.info.watchlist.forEach((item)=>{
         
                let list=[]
    
                 if(item.type=='series'){
                    Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&query=${item.title}&page=1&include_adult=false`)
                    .then((res)=>{
                        //setmain([res.data.results[0]])
                        movieList.push(res.data.results[0])
                        //console.log(movieList)
                        setmain(movieList)
                        //console.log(res.data.results[0])
                        //list.push(res.data.results[0])
                        setseries(list)
                        console.log('gotten')
                    })
                   
                 }
               
             })
        }
        return ()=>{
            canceled=false
        }
    },[])
    const getSeries=()=>{
        props.info.watchlist.forEach((item)=>{
         
            let list=[]

             if(item.type=='series'){
                Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&query=${item.title}&page=1&include_adult=false`)
                .then((res)=>{
                    //setmain([res.data.results[0]])
                    movieList.push(res.data.results[0])
                    //console.log(movieList)
                    setmain(movieList)
                    //console.log(res.data.results[0])
                    //list.push(res.data.results[0])
                    setseries(list)
                    console.log('gotten')
                })
               
             }
           
         })
        
    }
    const getUser=()=>{
        Axios.get(`https://flickmeet-1.herokuapp.com/get_user/${props.info.username}`)
        .then((res)=>{
            props.setUser(res.data)
            getSeries()
            console.log('shared')

        })
    } 

    const renderItem=({ item })=>{
        return(
            <TouchableOpacity onPress={()=>props.navigation.navigate('SeriesDetails',item)}>
            <SeriesCard poster={item.poster_path} title={item.name} date={item.first_air_date}>

            </SeriesCard>

        </TouchableOpacity>  
        )
    }
    const showLoading=()=>{
        return(
            <ActivityIndicator style={{marginTop:100,backgroundColor:"black"}} size='large' animating={true}/>
        )
    }
    return(
        <View>
               <LinearGradient colors={['maroon','maroon','black',]} style={{height:40,flexDirection:'row'}}>
           <Text style={{color:'white',marginLeft:wp('2%'),marginVertical:wp('2%'),fontSize:20}}>
                Series
            </Text>
           <TouchableOpacity style={{marginLeft:'auto',marginRight:wp('3%')}} onPress={()=>{
               getSeries()
           }}>
           <FontAwesome name="refresh" size={35} color="white" style={{marginVertical:wp('2%')}}/>
           </TouchableOpacity>
       </LinearGradient>
            <View>
            <FlatGrid
             
             itemDimension={100}
             spacing={10}
             data={main}
             style={{height:3000}}
             renderItem={renderItem}
            
             ListEmptyComponent={()=>(
                <SkeletonContent
                containerStyle={{}}
                isLoading={true}
                layout={[
                  { key: 'someId1', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId2', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId3', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId4', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId5', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId6', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId7', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId8', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId9', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId10', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId11', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId12', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                ]}
                boneColor="black"
                highlightColor="maroon"
                animationType="shiver"
                animationDirection="horizontalLeft"
                      />
             )}
            
            />
            </View>
         
         
        
        </View>
    )
}
const matchState=(state)=>{
    return {
        info:state.userInfo,
    }

}
const mapDispatch=(dispatch)=>{
    return {
        setUser:(item)=>{dispatch({type:'SET USER',user:item})}
    }
}
export default connect(matchState,mapDispatch) (WatchList)
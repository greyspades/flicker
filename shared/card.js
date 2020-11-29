import React, {useState,useEffect}from 'react';
import {StyleSheet,Text,View,ImageBackground} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import { color } from 'react-native-reanimated';
import Axios from 'axios'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'



const Card =(props)=>{
   /*const [main,setmain]=useState({
        movielist:[]
    })
    useEffect(()=>{
        getApi()
       //console.log("the movies are"+movie.movielist)
    })
    const getApi=()=>{
        Axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1')
        .then(res=>{
            setmain({
                movielist:res.data.results
            })
        })
    }*/
    var poster='shizzle'

    const link ='https://image.tmdb.org/t/p/w500'

    var path=props.poster

    var title=props.title

    var date=props.date

    
    
    return(
        <View style={{flex:1,alignItems:'center'}}>
                    <View style={styles.back}>
             <View style={styles.card}>
            <ImageBackground source={{uri:`https://image.tmdb.org/t/p/w500${path}`}}  style={styles.background}>
            {props.children}
            </ImageBackground>
        </View>
        
        <Text style={{marginBottom:0,color:'white',fontSize:15,marginLeft:3}} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>

        
        </View>
        </View>
      
    );
}

const styles=StyleSheet.create({
    card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:'grey',
        shadowOffset: {width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
       //margin:20,
        display:'flex',
        height:150,
        //width:40,
        justifyContent:'flex-end',
        

    },
    cardContent:{

    },
    background:{
        width:100,
        //height:150,
        resizeMode:'cover',
        flex:1
    },
    back:{
        width:100,
        height:175,
        backgroundColor:'maroon',
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        //borderBottomEndRadius:20,
        //height:200,
        //flexDirection:'row'
        //marginLeft:wp('3%'),

        
    },
    title:{
        color:'white',
        
        
    }
})

export default Card;
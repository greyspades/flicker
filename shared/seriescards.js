import React, {useState,useEffect}from 'react';
import {StyleSheet,Text,View,ImageBackground} from 'react-native'


const SeriesCard =(props)=>{
   
     var poster='shizzle'
 
     const link ='https://image.tmdb.org/t/p/w500'
 
     var path=props.poster
 
     var title=props.name
 
     var date=props.date
 
     
     
     return(
         <View style={styles.back}>
              <View style={styles.card}>
             <ImageBackground source={{uri:`https://image.tmdb.org/t/p/w500${path}`}}  style={styles.background}>
             {props.children}
             </ImageBackground>
         </View>
         
         <Text style={{marginBottom:0,color:'white',fontSize:15,marginLeft:3}} ellipsizeMode='tail' numberOfLines={1}>{props.title}</Text>
         
         <Text style={{color:'white',fontSize:12,marginTop:1,marginLeft:3}}>{props.date}</Text>
         
         </View>
       
     );
 }
 
 const styles=StyleSheet.create({
     card:{
         borderRadius:6,
         elevation:3,
         backgroundColor:'white',
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
         height:190,
         backgroundColor:'maroon',
         display:'flex',
         borderBottomLeftRadius:10,
         borderBottomRightRadius:10,
         //borderBottomEndRadius:20,
         //height:200,
         //flexDirection:'row'
         marginLeft:18
     },
     title:{
         color:'white'
     }
 })
 
 export default SeriesCard;
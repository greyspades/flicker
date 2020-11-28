import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,TextInput,modal,FlatList, Modal,TouchableWithoutFeedback,Keyboard,TouchableOpacity,ActivityIndicator   } from 'react-native'
import {Formik} from 'formik'
import {MaterialIcons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import Axios from 'axios';
import SeriesCard from '../shared/seriescards'
import renderitem from './renderitem';
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";


const seriesSearchbar=(props)=>{
    const [searched,setsearched]=useState([])
    const [toggle, settoggle]=useState()
    const [loading,setLoading]=useState(false)
    //const [title,setTitle]=useState()
    
    const searchMovie=(values)=>{
        Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&query=${values}&page=1&include_adult=false`)
        .then((res)=>{
            setsearched(res.data.results)
            //console.log(res.data.results)
        })
    }
    function enterDetails(item){
        props.navigation.navigate('SeriesDetails',item)
        props.method()
    }
    /*if(props.clear==true){
        setsearched(null)
    }*/
    return(
                <Modal  visible={props.toggleSearch} transparent={true}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient   colors={["black", "black", "black",'maroon']}
            style={{width:wp('100%'),height:wp('100%'),backgroundColor:'maroon',marginHorizontal:wp('0%'),
            borderBottomRightRadius:10,borderBottomLeftRadius:10,marginTop:wp('0%'),justifyContent:'center'}}>
                            <Formik initialValues={{movie:''}} onSubmit={(values)=>{
                searchMovie(values.movie)
                setLoading(true)
                
    }}>
    {({handleChange,handleBlur,handleSubmit,values})=>(
        <View>
            <AntDesign name='close' size={40} color='white' onPress={props.method} onPressOut={()=>{setsearched(null)}}/>
            <TextInput style={styles.form}
            placeholder='Title'
            onChangeText={handleChange('movie')} value={values.movie}/>
            <MaterialIcons name='search' size={40} onPress={handleSubmit} style={{color:'white',marginLeft:wp('80%'),marginTop:-40,backgroundColor:'maroon',borderBottomRightRadius:5,borderTopRightRadius:5,width:40}} />
        </View>
    )}

            </Formik>
            
            <FlatList
            style={{marginTop:50}}
            data={searched}
            horizontal={true}
            keyExtractor={(item)=>{item.id}}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>{enterDetails(item)}}  >
                <SeriesCard title={item.name} poster={item.poster_path} date={item.first_air_date} >

                </SeriesCard>
              </TouchableOpacity>
            )}
            ListEmptyComponent={()=>(<ActivityIndicator size='large' animating={loading} style={{marginLeft:150,marginBottom:20,color:'maroon'}} />)} />
            </LinearGradient>
        </TouchableWithoutFeedback>
          
        </Modal>
    )
}
const styles=StyleSheet.create({
    form:{
        width:250,
        height:40,
        backgroundColor:'black',
        marginLeft:wp('10%'),
        marginTop:wp('1%'),
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderColor:'maroon',
        borderWidth:5,
        textAlign:'center',
        color:'white'



    },
    modal:{
        backgroundColor:'grey',
        height:350
    }
})

export default seriesSearchbar
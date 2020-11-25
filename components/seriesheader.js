import React,{useState} from 'react';
import {StyleSheet,Text,View,TouchableWithoutFeedback,Modal} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
//import { Directions } from 'react-native-gesture-handler';
//import { NavigationActions } from 'react-navigation';
import SeriesSearchbar from './seriessearch'
import {AntDesign} from '@expo/vector-icons'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';
import {connect} from 'react-redux'

const SeriesHeader=(props)=>{
    const [search, setsearch]=useState(false)
    const [clear,setclear]=useState(false)
    const openmenu=()=>{
        props.navigation.openDrawer()
    }

    const opensearchbar=()=>{

        //setsearch(false)
        if(search==false){
            setsearch(true)
        }
        else if(search==true){setsearch(false)}
        setclear(true)

    }
    const showDot=()=>{
        if(props.log){
            return (
                <Entypo name="dot-single" size={50} color="green" style={{marginLeft:wp('13%')}} />
            )
        }
    }
    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={45} onPress={openmenu} style={styles.icon} />
            {showDot()}
            <Text style={styles.headertext}>Tv series</Text>
            <MaterialIcons name='search' size={40} 
            onPress={opensearchbar} style={{color:'white',marginLeft:wp('20%'),marginTop:wp('2%')}}/>
            <SeriesSearchbar toggleSearch={search} method={opensearchbar} clear={clear} navigation={props.navigation} />

            <Modal visible={false}>
                <Text>just checking this to see  how it works</Text>
            </Modal>
            

        </View>
    )
}
const mapState=(state)=>{
    return {
        log:state.isLogedIn
    }
}
const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        //alignItems:'center',
        //justifyContent:'center',
        //backgroundColor:'maroon',
        //marginBottom:wp('2%')
    },
    headertext:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
        marginLeft:wp('10%'),
        marginTop:wp('3%')
    },
    icon:{
        position:'absolute',
        //left:1,
        color:'white',
        marginLeft:wp('-3%'),
        marginTop:wp('1%')
        
    }
})
export default connect(mapState) (SeriesHeader)
import React,{useState} from 'react';
import {StyleSheet,Text,View,TouchableWithoutFeedback,Modal} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
//import { Directions } from 'react-native-gesture-handler';
//import { NavigationActions } from 'react-navigation';
import Searchbar from '../components/search'
import {AntDesign} from '@expo/vector-icons'
import {Formik} from 'formik'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';
import {connect} from 'react-redux'

const Header=(props)=>{
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
        if(props.loged){
            return (
                <Entypo name="dot-single" size={50} color="green" style={{marginLeft:wp('13%'),}} />
            )
        }
    }
    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={45} onPress={openmenu} style={styles.icon} />
            {showDot()}
            
            <View style={styles.heading}>
            <Text style={styles.headertext}>Movies</Text>
            </View>

            <MaterialIcons name='search' size={40} 
            onPress={opensearchbar} style={{color:'white',marginLeft:wp('28%'),marginTop:wp('2%')}}/>
            <View>
            <Searchbar  toggleSearch={search} method={opensearchbar} clear={clear} navigation={props.navigation} />
            </View>


            <Modal visible={false}>
                <Text>just checking this to see  how it works</Text>
            </Modal>
            

        </View>
    )
}
const mapState=(state)=>{
    return {
        loged:state.isLogedIn
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
        marginLeft:wp('10%')

    }
})
export default connect(mapState) (Header)
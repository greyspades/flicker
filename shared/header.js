import React,{useState} from 'react';
import {StyleSheet,Text,View,TouchableWithoutFeedback,Modal} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
//import { Directions } from 'react-native-gesture-handler';
//import { NavigationActions } from 'react-navigation';
import Searchbar from '../components/search'
import {AntDesign} from '@expo/vector-icons'
import {Formik} from 'formik'

const Header=({navigation})=>{
    const [search, setsearch]=useState(false)
    const [clear,setclear]=useState(false)
    const openmenu=()=>{
        navigation.openDrawer()
    }

    const opensearchbar=()=>{

        //setsearch(false)
        if(search==false){
            setsearch(true)
        }
        else if(search==true){setsearch(false)}
        setclear(true)

    }
    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={40} onPress={openmenu} style={styles.icon} />
            <MaterialIcons name='search' size={30} 
            onPress={opensearchbar} style={{color:'white',marginRight:-350}}/>
            <Searchbar toggleSearch={search} method={opensearchbar} clear={clear} navigation={navigation} />

            <Modal visible={false}>
                <Text>just checking this to see  how it works</Text>
            </Modal>
            

        </View>
    )
}
const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'maroon',
    },
    headertext:{
        fontWeight:'bold',
        fontSize:20,
        color:'#333',
    },
    icon:{
        position:'absolute',
        left:1,
        color:'white'
    }
})
export default Header
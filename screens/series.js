import React,{useState,useEffect} from 'react'
import { Text, View,StyleSheet,Button,TouchableOpacity,ActivityIndicator} from 'react-native'
import Axios from 'axios'
import Card from '../shared/card'
import {SectionGrid,FlatGrid} from 'react-native-super-grid'
//import FastImage from 'react-native-fast-image'
import Renderitem from '../components/renderitem'
import SeriesCard from '../shared/seriescards'
import {connect} from 'react-redux'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'


const Series = (props) => {
    /*const [main,setmain]=useState([])
    
    const getSeries=()=>{
        Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
    }
    return (
        <div>
            
        </div>
    )*/
    const [popular,setpopular]=useState([])
       
 
    const [page,setpage]=useState(1)
    const [loading,setloading]=useState([])
    const [prev,setprev]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    
    useEffect(()=>{
       let isCancelled=false;
       Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
       .then((res)=>{
        if(!isCancelled){
            props.setSeries(res.data.results)
        }
    })
    return ()=>{
        isCancelled=true;
    }
    })

    const getapi=()=>{
     Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
     .then((res)=>{
        //setpopular([...loading,...res.data.results])
        props.setSeries(res.data.results)
     })
    }
    const getrest=()=>{
        setpage(page+1)
        Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
     .then((res)=>{
        props.updateSeries(res.data.results)
     })
    }

    function nav(item){
        navigation.navigate('Details',item);
        
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

    //const navigate=useCallback(({item})=>{navigation.navigate('Details',item)},[item])
    const ren=({ item })=>{return(<Renderitem item={item} navigation={navigation} />)}

    return(
        <View style={{flex:1,}}>
            <ActivityIndicator style={{backgroundColor:'black'}} size='large' animating={isLoading}/>
         

            <FlatGrid
            
             itemDimension={100}
             spacing={10}
             data={props.series}
             style={styles.grid}
             renderItem={renderItem}  
             initialNumToRender={10}
             maxToRenderPerBatch={10}
             onEndReached={getrest}
             onEndReachedThreshold={0.5}
            
            />
           
              
        </View>
      
    )
}
const mapStateToProps=(state)=>{
    return {
        series:state.series,
        update:state.update,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setSeries:(item)=>{dispatch({type:'SET SERIES',item:item})},
        updateSeries:(item)=>{dispatch({type:'UPDATE SERIES', item:item})}
    }
}
const styles=StyleSheet.create({
    grid:{ 
        //marginTop:20,
        backgroundColor:'black',

        
    },
})



export default connect(mapStateToProps,mapDispatchToProps)(Series)

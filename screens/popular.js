import React, { useState,useEffect, useCallback,useMemo,  } from 'react'
import { Text, View,StyleSheet,Button,TouchableOpacity,ActivityIndicator,InteractionManager} from 'react-native'
import Axios from 'axios'
import Card from '../shared/card'
import {SectionGrid,FlatGrid} from 'react-native-super-grid'
import FastImage from 'react-native-fast-image'
import Renderitem from '../components/renderitem'
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'




const Popular=(props)=>{
    const [popular,setpopular]=useState([])
    const [main,setmain]=useState(movies)       
 
    //const [page,setpage]=useState(1)
    const [loaded,setloaded]=useState(false)
    const [prev,setprev]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    
    useEffect(()=>{
            let isCancelled=false;
            Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${props.page}`)
            .then((res)=>{
            if(!isCancelled){
                props.setMovies(res.data.results)
                setloaded(true)
            
            }
            })
            return ()=>{
                isCancelled=true;
            }
        //getrest()
    })

    const log=()=>{
        console.log(popular)
       //getapi()
    }
    const display=()=>{
        return(
            <View>
                
            </View>
        )
    }
    
    var pop=popular
    var next=[]

    const getapi=()=>{
     Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${props.page}`)
     .then((res)=>{
        props.setMovies(res.data.results)
     })
    }
    const getrest=()=>{
     props.nextPage()
     Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${props.page}`)
     .then((res)=>{
        props.updateMovies(res.data.results)
     })
    }

    function nav(item){
        navigation.navigate('Details',item);
        
    }
    const clearNav=()=>{
        props.navigation.dispatch(NavigationActions.reset({
            index:0,
            key:null,
            actions:[NavigationActions.navigate({routeName:'Popular'})]
        }))
    }
    
    const renderItem=({ item })=>{
        return(
            <TouchableOpacity onPress={()=>props.navigation.navigate('Details',item)}>
            <Card poster={item.poster_path} title={item.title} date={item.release_date}>

            </Card>

            </TouchableOpacity>  
        )
    }
    const showLoading=()=>{
        return(
            <ActivityIndicator style={{marginTop:100,backgroundColor:"black"}} size='large' animating={true}/>
        )
    }
    var movieList=props.movies

    //const navigate=useCallback(({item})=>{navigation.navigate('Details',item)},[item])
    const ren=({ item })=>{return(<Renderitem item={item} navigation={props.navigation} />)}
     const {movies}=props
    
    return(
        <View style={{flex:1}}>
          
            <ActivityIndicator style={{backgroundColor:'black'}} size='large' animating={isLoading}/>
            <FlatGrid
             
             itemDimension={100}
             spacing={10}
             data={movieList}
             style={styles.grid}
             renderItem={ren}  
             initialNumToRender={10}
             maxToRenderPerBatch={10}
             onEndReached={getrest}
             onEndReachedThreshold={0.5}
             ListEmptyComponent={showLoading}
   
            />
           
              
        </View>
      
    )
}

const mapToProps=(state)=>{
    return {
        movies:state.movies,
        page:state.page
    }
}
const dispatchToProps=(dispatch)=>{
    return{
        setMovies:(item)=>{dispatch({type:'SET MOVIES',item:item})},
        updateMovies:(update)=>{dispatch({type:'UPDATE MOVIES',update:update})},
        nextPage:()=>{dispatch({type:'NEXT PAGE'})}

    }
}
const styles=StyleSheet.create({
    grid:{ 
        //marginTop:20,
        backgroundColor:'black',
        
        
    },
})

export default connect(mapToProps,dispatchToProps)(Popular)
import React, { useState,useEffect, useCallback,useMemo,  } from 'react'
import { Text, View,StyleSheet,Button,TouchableOpacity,ActivityIndicator,InteractionManager, AsyncStorage} from 'react-native'
import Axios from 'axios'
import Card from '../shared/card'
import {SectionGrid,FlatGrid} from 'react-native-super-grid'
import FastImage from 'react-native-fast-image'
import Renderitem from '../components/renderitem'
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
//import AnimatedLoader from 'react-native-animated-loader'
import Spinner from 'react-native-loading-spinner-overlay';
import {persistStore,persistReducer} from 'redux-persist'
import movieReducer from '../redux/reducers/moviereducer'
//import MyTab from '../routes/tab'



const UpcomingMovies=(props)=>{
    const [popular,setpopular]=useState([])
    const [main,setmain]=useState(movies)       
 
    //const [page,setpage]=useState(1)
    const [loaded,setloaded]=useState(false)
    const [prev,setprev]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [spinner,setSpinner]=useState(false)
    const [page,setpage]=useState(1)
    
    useEffect(()=>{
            let isCancelled=false;
            let item=props.navigation.getParam('item')
            Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
            .then((res)=>{
            if(!isCancelled){
                props.setMovies(res.data.results)
                setloaded(true)
                props.login(item)
            
            }
            })
          
            return ()=>{
                isCancelled=true;
            }
            setInterval(() => {
                setSPinner(false);
              }, 3000);
        
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
     Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
     .then((res)=>{
        props.setMovies(res.data.results)
     })
    }
    const getrest=()=>{
     setpage(page+1)
     Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
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
        <View style={{flex:1,backgroundColor:'black', }}>
              <Button style={{marginBottom:20}} title='purge' onPress={()=>{props.clear}} />
            <ActivityIndicator style={{backgroundColor:'black'}} size='large' animating={isLoading}/>
            <Spinner
          visible={false}
          textContent={'Loading...'}
          color='maroon'
          size={'large'}
          
          
        />
    
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
        movies:state.upcomingMovies,
        page:state.page
    }
}
const dispatchToProps=(dispatch)=>{
    return{
        setMovies:(item)=>{dispatch({type:'SET UCM',item:item})},
        updateMovies:(update)=>{dispatch({type:'UPDATE UCM',item:update})},
        nextPage:()=>{dispatch({type:'NEXT PAGE'})},
        login:(item)=>{dispatch({type:'LOG in',user:item})},
        clear:()=>{dispatch({type:'CLEAR MOVIES',})}

    }
}
const styles=StyleSheet.create({
    grid:{ 
        //marginTop:20,
        backgroundColor:'black',
        marginTop:wp('-10%')
       
        
        
    },
})

export default connect(mapToProps,dispatchToProps)(UpcomingMovies)
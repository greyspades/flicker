import React, { useState,useEffect, useCallback,useMemo,  } from 'react'
import { Text,Image, View,StyleSheet,Button,TouchableOpacity,ActivityIndicator,InteractionManager, AsyncStorage} from 'react-native'
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
import { LinearGradient } from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const MovieGenres=(props)=>{
    const [popular,setpopular]=useState([])
    const [main,setmain]=useState(movies)       
 
    //const [page,setpage]=useState(1)
    const [loaded,setloaded]=useState(false)
    const [prev,setprev]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [spinner,setSpinner]=useState(false)
    const [page,setpage]=useState(1)
    const [genre,setgenre]=useState([])
    useEffect(()=>{
            let isCancelled=false;
            let item=props.navigation.getParam('item')
            Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US`)
            .then((res)=>{
            if(!isCancelled){
                setloaded(true)
                setgenre(res.data.genres)
                //console.log(res.data.genres)
            }
            })
          
            return ()=>{
                isCancelled=true;
            }
            setInterval(() => {
                setSPinner(false);
              }, 3000);
        
    },[])

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
     Axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
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
    
    const show=(item)=>{
        if(item.name=='Action'){
            return(
                <View style={{padding:5}}>
                   <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                   <Text style={{color:'white'}}>{item.name}</Text>
                    <Image source={require('../assets/target.png')} style={{marginLeft:wp('7%')}} />
                   </TouchableOpacity>
                </View>
            )
        }
        else if(item.name=='Adventure'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/shield.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
               </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Comedy'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Fontisto name="laughing" size={60} color="white" style={{marginLeft:wp('7%')}}/>
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Animation'){
            return(
                <View style={{padding:5}}>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
              <Text style={{color:'white'}}>{item.name}</Text>
                <MaterialCommunityIcons name="animation" size={60} color="white" style={{marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='trim'){
            return(
                <View style={{padding:5}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                <Text style={{color:'white'}}>{item.name}</Text>
                <MaterialCommunityIcons name="animation" size={60} color="white" style={{marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Romance'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/hearts.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Thriller'){
            return(
                <View style={{padding:5}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/killer.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Horror'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/halloween-death-with-scythe.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Fantasy'){
            return(
                <View style={{padding:5}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/dragon.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Family'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/family.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Mystery'){
            return(
                <View style={{padding:5}}>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
              <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/mystery.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Drama'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/theater.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Science Fiction'){
            return(
                <View style={{padding:5}}>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
              <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/robot.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Crime'){
            return(
                <View style={{padding:5}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                    <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/police-line.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Documentary'){
            return(
                <View style={{padding:5}}>
                     <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                     <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/history.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='History'){
            return(
                <View style={{padding:5}}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
               <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/documentary.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
        else if(item.name=='Music'){
            return(
                <View style={{padding:5}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('main',{item:item})}}>
                <Text style={{color:'white'}}>{item.name}</Text>
                <Image source={require('../assets/music-note.png')} style={{width:60,height:60,marginLeft:wp('7%')}} />
                   </TouchableOpacity>
            </View>
            )
        }
    }

    return(
        <View style={{flex:1,backgroundColor:'black', }}>
              <Button style={{marginBottom:20}} title='purge' onPress={()=>{console.log(genre)}} />
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
             data={genre.filter((obj)=>{return obj.name!=='TV Movie'}).slice(0,16)}
             style={styles.grid}
             renderItem={({item})=>(
                <LinearGradient colors={['maroon','maroon','black']} style={{marginBottom:wp('10%'), height:100}}>
                   <View>
                   {show(item)}
                   </View>
                </LinearGradient>
             )}  
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

export default connect(mapToProps,dispatchToProps)(MovieGenres)
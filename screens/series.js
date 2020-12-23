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
import {Picker} from '@react-native-picker/picker'
import DropDownPicker from 'react-native-dropdown-picker';
import SeriesCard from '../shared/seriescards'
import SkeletonContent from 'react-native-skeleton-content';
//import MyTab from '../routes/tab'



const Series=(props)=>{
    const [popular,setpopular]=useState([])
    const [main,setmain]=useState([])       
 
    const [page,setpage]=useState(1)
    const [loaded,setloaded]=useState(false)
    const [prev,setprev]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [spinner,setSpinner]=useState(false)
    const [year,setyear]=useState(new Date().getFullYear())
    
    useEffect(()=>{
            let isCancelled=false;
            
            let item=props.navigation.getParam('item')
            Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&sort_by=popularity.desc&first_air_date_year=${year}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`)
            .then((res)=>{
            if(!isCancelled){
                //props.setMovies(res.data.results)
                setmain([...prev,...res.data.results])
                setloaded(true)
                //props.login(item)
            
            }
            })
          
            return ()=>{
                isCancelled=true;
            }
            setInterval(() => {
                setSPinner(false);
              }, 3000);
        
    })
    const getItems=()=>{
        
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}`)
        .then((res)=>{
        
            //props.setMovies(res.data.results)
            setmain([...prev,...res.data.results])
            console.log('shwoo')
        })
    }

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
     //props.nextPage()
     setpage(page+1)
     Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&sort_by=popularity.desc&first_air_date_year=${year}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`)
     .then((res)=>{
        //props.updateMovies(res.data.results)
        setprev([...main,res.data.results.shift()])
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
    var movieList=props.movies

    //const navigate=useCallback(({item})=>{navigation.navigate('Details',item)},[item])
    const ren=({ item })=>{return(<Renderitem item={item} navigation={props.navigation} />)}
     const {movies}=props
     var today=new Date()
     var the_year=today.getFullYear().toString()
     var this_year=today.getFullYear()
    
     var year_list=[]
     var year_val=[]
     while(year_list.length<30){
         let year_2=this_year--
         year_val.push(year_2)
         year_list.push({label:year_2.toString(),value:year_2.toString()})
 
     }
    return(
        <View style={{backgroundColor:'black', }}>
             <View style={{flexDirection:'row'}}>
               <Text style={{color:'white',marginVertical:wp('2%'),fontSize:17,marginLeft:wp('2%')}}>Popular</Text>
               <Text style={{color:'white',marginLeft:wp('7%'),marginTop:wp('2.2%'),fontSize:16}}>{year}</Text>
                <View style={{ marginLeft:'auto',marginRight:wp('4%')}}>
               
                <DropDownPicker items={year_list}
                            
                           
                            onChangeItem={(item)=>{
                               
                               setyear(item.value)
                                setmain([])
                                setprev([])
                            }}
                            placeholder='year'
                            
                            containerStyle={{height:27,width:90,marginVertical:wp('2'),}}
                            dropDownStyle={{backgroundColor: 'black',}}
                            itemStyle={{
                                justifyContent:'center'
                            }}
                            labelStyle={{
                                fontSize: 14,
                                textAlign: 'center',
                                color: 'white',
                                alignItems:'center'
                                
                            }}
                            selectedtLabelStyle={{
                                color: 'maroon'
                            }}
                            placeholderStyle={{
                                fontWeight: 'bold',
                                fontSize:40,
                                
                                color:'white'
                            }}
                           
                            activeLabelStyle={{color: 'maroon'}}  
                          
                        />
                </View>
            </View>
 

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
             data={main}
             style={styles.grid}
             renderItem={renderItem}  
             initialNumToRender={10}
             maxToRenderPerBatch={10}
             onEndReached={getrest}
             onEndReachedThreshold={0.5}
             ListEmptyComponent={()=>(
                <SkeletonContent
                containerStyle={{}}
                isLoading={true}
                layout={[
                  { key: 'someId1', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId2', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId3', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId4', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId5', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId6', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId7', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId8', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId9', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                  { key: 'someId10', width: 100, height: 150, marginBottom: 6 ,marginLeft:wp('3%'),marginTop:wp('3%')},
                  { key: 'someOtherId11', width: 100, height: 150, marginLeft:wp('36%'),marginTop:wp('-43%')},
                  { key: 'someOtherId12', width: 100, height: 150,marginTop:wp('-41.5%'),marginLeft:'auto',marginRight:wp('3%')},
                ]}
                boneColor="black"
                highlightColor="maroon"
                animationType="shiver"
                animationDirection="horizontalLeft"
                      />
             )}
   
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
        nextPage:()=>{dispatch({type:'NEXT PAGE'})},
        login:(item)=>{dispatch({type:'LOG in',user:item})},
        clear:()=>{dispatch({type:'CLEAR MOVIES',})},
    }
}
const styles=StyleSheet.create({
    grid:{ 
        //marginTop:20,
        backgroundColor:'black',
        marginTop:wp('-10%')
       
        
        
    },
})

export default connect(mapToProps,dispatchToProps)(Series)
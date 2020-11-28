import React, { PureComponent, useState,useEffect,useRef } from 'react'
import { Text,RefreshControl, View,Button,StyleSheet,Image,ScrollView,ImageBackground,Form,FlatList,TouchableOpacity,InteractionManager,TextInput} from 'react-native'
import Axios from 'axios'
//import Modal,{ModalContent,Backdrop} from 'react-native-modals'
import Modal from 'react-native-modal'
import Mybutton from '../shared/button'
import Overview from './ovierview'
import Icon from 'react-native-vector-icons/FontAwesome'
import {MaterialIcons} from '@expo/vector-icons' 
import {MdiAccount} from '@mdi/js'
//import {FontAwesomeIicon} from '@fortawesome/react-fontawesome'
//import Icon from'@mdi/react'
import {mdiStarOutline} from '@mdi/js'
import { NavigationActions,useScrollToTop, StackActions } from 'react-navigation'
//import { FlatList } from 'react-native-gesture-handler'
import SeriesCard from '../shared/seriescards'
import { interpolate, Value } from 'react-native-reanimated'
//import {useScrollToTop} from '@react-navigation/native';
import {AfterInteractions} from 'react-native-interactions'
import Placeholder from '../components/loadingplaceholder'
import AnimatedSplash from 'react-native-animated-splash-screen'
import {widthPercentageToDP as wp,heightPercentageTODP as hp} from 'react-native-responsive-screen'
import { AntDesign } from '@expo/vector-icons';
import {connect} from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import {Formik} from 'formik'
import YoutubePlayer from "react-native-youtube-iframe";


const SeriesDetails=(props)=>{
  const [interactions,setinteractions]=useState(false)
  const [visible,setvisible]=useState({
    overview:false,
    ratemovie:false,
  
  })
  const [similar,setsimilar]=useState([])

  const [refresh,setrefresh]=useState(false)

  const [coordinates,setcoordinates]=useState([])

  const [liked,setLiked]=useState(false)

  const [rate,setRate]=useState()

  const [userRating,setUserRating]=useState(1)

  const [shareClicked,setShareClicked]=useState(false)

  const [trailer,setTrailer]=useState(false)

  const [trailerId,setTrailerId]=useState()

  
  
  const genretype=[]
  var genrecode=props.navigation.getParam('genre_ids')
  
    var poster=props.navigation.getParam('poster_path');

    var backdrop=props.navigation.getParam('backdrop_path')

    

    var id=props.navigation.getParam('id')

    const scrollRef=useRef();

    const link=`https://image.tmdb.org/t/p/w500${poster}`;
          
    const background=`https://image.tmdb.org/t/p/w500${backdrop}`

    const link2='https://image.tmdb.org/t/p/original/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg'

    var title=props.navigation.getParam('name')

    const checkLiked=()=>{
      let title=props.navigation.getParam('title')
      if(props.info.favourites.includes(title)) {
        setLiked(true)
      }
    }

    useEffect(()=>{
      let title=props.navigation.getParam('name')
      Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${title+' trailer'}&type=video&key=AIzaSyBdiVQhDYy29IuM3pWaZRzboNKEvKojr0w`)
      .then((res)=>{
        let id=res.data.items[0].id.videoId
        console.log(res.data.items[0])
          setTrailerId(id)
      })
      getSimilar()
       
      },[])


      const getSimilar=()=>{
        Axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1`)
        .then((res)=>{
          setsimilar(res.data.results)
        })
      }
      

      const showReview=()=>{
       if(rate){
        return (
          <LinearGradient   colors={["black", "black", "black",'maroon']}
          style={{width:wp('85%'),height:wp('50%'),backgroundColor:'maroon',marginHorizontal:wp('7%'),
          borderRadius:10,marginTop:wp('15%'),justifyContent:'center'}}>
                <View style={{flex:1,flexDirection:'row',marginHorizontal:wp('25%')}}>
                 
                  <TouchableOpacity style={{marginHorizontal:wp('17%'),marginLeft:wp('-23%')}} onPress={()=>{
                    setRate(false)
                  }}>
                        <AntDesign  name='close' size={30} color='white'/>
                  </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{setUserRating(userRating-1)}}>
            <FontAwesome name="arrow-left" size={35} color="maroon" />
          </TouchableOpacity>
        <Text style={{color:'white',fontSize:20,marginHorizontal:wp('5%')}}>{userRating}</Text>
          <TouchableOpacity onPress={()=>{setUserRating(userRating+1)}}>
          <FontAwesome name="arrow-right" size={35} color="maroon" />
          </TouchableOpacity>
     
         </View>
         <Formik initialValues={{review:''}} onSubmit={(values)=>{
           let item={
             user:props.info.username,
             review:values.review,
             rating:userRating,
             title:props.navigation.getParam('name')
           }
                 Axios.post(`http://192.168.43.62:5000/rate`,{item})
                  .then((res)=>{
                    if(res.data=='SAVED'){
                      setRate(false)
                    }
                  })
                  //console.log(rateItem)
         }}>
           {({handleChange,handleBlur,handleSubmit,values})=>(
             <View style={{flex:1,flexDirection:'row',marginBottom:wp('28%'),marginLeft:wp('3%')}}>
                <TextInput style={{width:wp('60%'),height:wp('10%'),fontSize:wp('5%'),backgroundColor:'black',color:'white'}}
                placeholder='review'
                onChangeText={handleChange('review')} value={values.review}
                      
                selectionColor='white' />
                    <TouchableOpacity onPress={handleSubmit} style={{width:60,height:30,marginLeft:wp('3%'),backgroundColor:'maroon',borderRadius:5,padding:6}}>
                 
                      <Text style={{color:'white',textAlign:'center'}}>Submit</Text>
                    </TouchableOpacity>
             </View>
           )}

         </Formik>
        

          </LinearGradient>
                
             
            
      )
       }
       else {
         return(
          <TouchableOpacity onPress={()=>{setRate(true)}} style={{width:75,height:40,marginLeft:wp('3%'),marginTop:wp('3%'),backgroundColor:'maroon',borderRadius:5,padding:6}}>
                 
          <Text style={{color:'white',textAlign:'center',fontSize:20}}>rate</Text>
        </TouchableOpacity>
         )
       }
      }
     
    
    const scrollTop=()=>{
      scrollRef.ScrollTo({y:0,animated:true})
    }

    const showHeart=()=>{
      let title=props.navigation.getParam('name')
      if(liked||props.info.favourites.includes(title)){
        return (
          <TouchableOpacity onPress={()=>{
            Axios.get(`http://192.168.43.62:5000/remove_from_fav/${props.navigation.getParam('name')}/${props.info.username}`)
            .then((res)=>{
              
            })
          }} style={{marginLeft:wp('80%'),marginBottom:wp('2%')}}>
          <AntDesign name="heart" size={35} color="maroon" />
          </TouchableOpacity>
         
        )
      }
      else {
        return (
          <TouchableOpacity onPress={addToFav} style={{marginLeft:wp('80%'),marginBottom:wp('2%')}}>
          <AntDesign name="hearto" size={35} color="white" />
          </TouchableOpacity>
         
        )
      }
    }

    


    const addToFav=()=>{
      let fav={
        username:props.info.username,
        title:props.navigation.getParam('name')
      }
      Axios.post(`http://192.168.43.62:5000/add_to_favourites`,{fav})
      .then((res)=>{
        console.log(res.data)
        setLiked(true)
      })
      
    }
    const playTrailer=()=>{
      if(!trailer){
        return(
          <View>
            <TouchableOpacity onPress={()=>{setTrailer(true)}}>
              <LinearGradient colors={['black','black','maroon']} style={{
                width:150,height:50,marginHorizontal:wp('30%'),borderRadius:10
              }}>
                <FontAwesome style={{textAlign:'center',marginTop:wp('3%')}} name="play" size={30} color="white" />

              </LinearGradient>
            </TouchableOpacity>
          </View>
        )
      }
      else {
        return(
          <YoutubePlayer
          height={300}
          play={trailer}
          videoId={trailerId}
          style={{marginBottom:wp('20%')}}
          
        />
        )
      }
    }

    
    
    
  return (
      <AfterInteractions placeholder={<AnimatedSplash
        transluscent={true}
        isLoaded={false}
        backgroundColor={'black'}
        logoImage={require(('../assets/logo.jpg'))}
        logoHeight={'100%'}
        logoWidth={'100%'}
        />}>
             <ImageBackground source={{uri:background}} style={styles.background}>
        <View View style={{backgroundColor:'rgba(0,0,0,0.7)',flex:1}}>
        <ScrollView style={styles.scroll} ref={scrollRef} >
        
          <ScrollView ref={scrollRef}
          >
            
          <Image source={{uri:link}} style={styles.image} resizeMode='stretch'/>
          <View style={{flex:1,flexDirection:'row'}}>
          <Text style={styles.title}>{props.navigation.getParam('name')}</Text>
        
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            
          {showHeart()}
          
          </View>

         <View style={{ flex:1,flexDirection:'row',marginBottom:10,marginLeft:15}}>
         {
          genrecode.map((item)=>{
            if(item==28){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Action</Text>)
            }
            else if(item==12){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Adventure</Text>)
            }
            else if(item==16){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Animation</Text>)
            }
            else if(item==35){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Comedy</Text>)
            }
            else if(item==80){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Crime</Text>)
            }
            else if(item==99){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Documentary</Text>)
            }
            else if(item==18){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Drama</Text>)
            }
            else if(item==10715){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>family</Text>)
            }
            else if(item==14){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Fantasy</Text>)
            }
            else if(item==36){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>History</Text>)
            }
            else if(item==27){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Horror</Text>)
            }
            else if(item==10402){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Music</Text>)
            }
            else if(item==9648){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Mystery</Text>)
            }
            else if(item==10749){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Romance</Text>)
            }
            else if(item==878){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Science Fiction</Text>)
            }
            else if(item==10770){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Tv Movie</Text>)
            }
            else if(item==53){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Thriller</Text>)
            }
            else if(item==10752){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>War</Text>)
            }
            else if(item==37){
              return(<Text style={{color:'white',fontSize:20,marginRight:10}}>Western</Text>)
            }
            
          })
          }
         </View>
          {playTrailer()}
            <View style={styles.infocontainer}>
            
            <Text style={styles.date}>{props.navigation.getParam('first_air_date')}</Text>
            <MaterialIcons name='star' size={30} style={styles.icon}/>
            <Text style={{color:'white',fontSize:22}}>{props.navigation.getParam('vote_average')} / {props.navigation.getParam('vote_count')} votes</Text>
            </View>
           
          <View style={styles.line}></View>
          <View >
          <Overview  overview={props.navigation.getParam('overview')} toggle={visible.overview} />
          <View style={{flex:1,flexDirection:'row'}}>
          {showReview()}
          <TouchableOpacity onPress={()=>{props.navigation.navigate('Recommend',{title:title,type:'series'})}} style={{marginLeft:wp('59%')}}>
          <FontAwesome name="share" size={45} color="maroon" />
          </TouchableOpacity>
          </View>
       
          </View>
          
                   
          <View style={styles.line}></View>
         
          </ScrollView>
        
          <RefreshControl
          refreshing={refresh} />

       
        
        {/*<Image source={{uri:link}} style={{width:400,height:400}} resizeMode={"contain"}/>*/}
        <View>
        <FlatList

         data={similar}
         horizontal={true}
         keyExtractor={(key)=>{key.id}}
         renderItem={({item})=>(
          <TouchableOpacity onPress={()=>{props.navigation.replace('SeriesDetails', item),setrefresh(true)}}>
          <SeriesCard poster={item.poster_path} title={item.name} date={item.first_air_date} refresh={refresh}>

</SeriesCard>
        </TouchableOpacity>
         )
         }
        />
        </View>
       
        </ScrollView>
        
        </View>

        </ImageBackground>   
      
      </AfterInteractions>   
  )
}
const mapState=(state)=>{
return {
  favourite:state.favourites,
  info:state.userInfo
}
}
const mapDispatch=(dispatch)=>{
return {
  addFavourite:(item)=>{dispatch({type:'ADD TO FAVOURITES',item:item})}
}
}

const styles=StyleSheet.create({
  overview:{
    fontSize:30,
    color:'white',
    opacity:2,
  
    //backgroundColor:'black'
  },

  background:{
    height:'100%',
    width:'100%',
    resizeMode:'cover',
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)'
    

  },
  title:{
    color:'white',
    fontSize:30,
    marginBottom:20,
    fontWeight:'bold',
    marginLeft:15
    

  },
  scroll:{
    display:'flex',
    //flexDirection:'row'
    //backgroundColor:'black',
    //height:300,
    //width:300,
   // opacity:0.5
  },
  ovierviewcontainer:{
    //backgroundColor:'black',
    
    
  },
  inner:{
    backgroundColor:'black',
    height:500,
    opacity:0.5
    

  },
  modal:{
    //height:500,
    //backgroundColor:'blue',
    //marginVertical:100,
    marginTop:30,
    borderRadius:15,
    //color:'black'
    //backgroundColor:'black'
    

    
  },
  image:{
    flex:1,
    //marginBottom:30,
    width:wp('90%'),
    height:wp('90%'),
    //marginLeft:20,
    marginHorizontal:wp('5%'),
    marginTop:wp('2%'),
    justifyContent:'center',
    alignContent:"center",

  },
  over:{
    marginTop:10,
    marginBottom:300
  },
  line:{
    width:wp('90%'),
    height:3,
    backgroundColor:'maroon',
    opacity:0.5,
    alignContent:'center',
    justifyContent:'center',
    marginHorizontal:wp('5%')
    //marginLeft:15,
    //marginTop:70
},
icon:{
  color:'maroon',
  marginLeft:60,

},
date:{
color:'white',
fontSize:20,

},
infocontainer:{
flex:1,
flexDirection:'row',
marginBottom:20,
marginHorizontal:wp('3%'),
marginTop:20,
}

})

export default connect(mapState,mapDispatch) (SeriesDetails)
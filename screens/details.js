import React, { PureComponent, useState,useEffect,useRef } from 'react'
import { Text,RefreshControl, View,Button,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity,InteractionManager } from 'react-native'
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
import Card from '../shared/card'
import { interpolate } from 'react-native-reanimated'
//import {useScrollToTop} from '@react-navigation/native';
import {AfterInteractions} from 'react-native-interactions'
import Placeholder from '../components/loadingplaceholder'
import AnimatedSplash from 'react-native-animated-splash-screen'

const Details=({navigation})=>{
    const [interactions,setinteractions]=useState(false)
    const [visible,setvisible]=useState({
      overview:false,
      ratemovie:false,
    
    })
    const [similar,setsimilar]=useState([])

    const [refresh,setrefresh]=useState(false)

    const [coordinates,setcoordinates]=useState([])
    
    const genretype=[]
    var genrecode=navigation.getParam('genre_ids')
    
      var poster=navigation.getParam('poster_path');

      var backdrop=navigation.getParam('backdrop_path')

      var id=navigation.getParam('id')

      const scrollRef=useRef();

      const link=`https://image.tmdb.org/t/p/w500${poster}`;
            
      const background=`https://image.tmdb.org/t/p/w500${backdrop}`

      const link2='https://image.tmdb.org/t/p/original/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg'

      const resetAction=StackActions.reset({
        index:0,
        actions:[NavigationActions.navigate({routeName:'Details'})]
      })

      useEffect(()=>{
      
          Axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1`)
          .then((res)=>{
            setsimilar(res.data.results)
            
            
          })
          //navigation.dispatch(resetAction)
        })
       
      
      const scrollTop=()=>{
        scrollRef.ScrollTo({y:0,animated:true})
      }
      
      
      
    return (
        <AfterInteractions placeholder={<AnimatedSplash
          transluscent={true}
          isLoaded={false}
          backgroundColor={'black'}
          logoImage={require('../components/loading.jpeg')}
          logoHeight={200}
          logoWidth={200}
          />}>
               <ImageBackground source={{uri:background}} style={styles.background}>
          <View View style={{backgroundColor:'rgba(0,0,0,0.7)'}}>
          <ScrollView style={styles.scroll} ref={scrollRef} >
          
            <ScrollView ref={scrollRef}
            >
            <Image source={{uri:link}} style={styles.image} resizeMode={"stretch"} />
            
            
            <Text style={styles.title}>{navigation.getParam('title')}</Text>
            
           <View style={{flexDirection:'row',marginBottom:10,marginLeft:15}}>
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

              <View style={styles.infocontainer}>
              
              <Text style={styles.date}>{navigation.getParam('release_date')}</Text>
              <MaterialIcons name='star' size={30} style={styles.icon}/>
              <Text style={{color:'white',fontSize:22}}>{navigation.getParam('vote_average')} / {navigation.getParam('vote_count')} votes</Text>
              </View>
            <View style={styles.line}></View>
            <View >
            <Overview  overview={navigation.getParam('overview')} toggle={visible.overview} />
            </View>
            
            
            <Button title={'log'} onPress={()=>{console.log(similar)}}></Button>
            <View style={styles.line}></View>
           
            </ScrollView>
          
            <RefreshControl
            refreshing={refresh} />

          <Text style={{color:'white'}}>{navigation.getParam('id')}</Text>
          
          {/*<Image source={{uri:link}} style={{width:400,height:400}} resizeMode={"contain"}/>*/}
          <View>
          <FlatList

           data={similar}
           horizontal={true}
           keyExtractor={(key)=>{key.id}}
           renderItem={({item})=>(
            <TouchableOpacity onPress={()=>{navigation.navigate('Details', item),setrefresh(true)}}>
            <Card poster={item.poster_path} title={item.title} date={item.release_date} refresh={refresh}>

            </Card>
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
      //flex:1
      marginBottom:30,
      width:370,
      height:300,
      marginLeft:20,

    },
    over:{
      marginTop:10,
      marginBottom:300
    },
    line:{
      width:400,
      height:3,
      backgroundColor:'white',
      opacity:0.5,
      marginLeft:15,
      //marginTop:70
  },
  icon:{
    color:'white',
    marginLeft:100
},
date:{
  color:'white',
  fontSize:20
},
infocontainer:{
  flex:2,
  flexDirection:'row',
  marginBottom:20,
  marginLeft:15,
  marginTop:20
}

})

export default Details
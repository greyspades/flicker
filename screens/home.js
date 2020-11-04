import React, { useState,useEffect } from 'react'
import { Text, View,StyleSheet,Button,TouchableOpacity,FlatList,Image, ImageBackground } from 'react-native'
import Axios from 'axios'
import { color } from 'react-native-reanimated'
import Card from '../shared/card'
import {SectionGrid,FlatGrid} from 'react-native-super-grid'

const Home=({navigation})=>{
    const [main,setmain]=useState({
        movielist:[],
        trending:[],
        page:9,
        currentpage:2,
        type:'popular',
        next:[]
    })
    const [page,setpage]=useState(1)
   
    //var top_rated='top_rated'
    //var sort='popular'
    //var currentpage=9

    var pages=[1,2,3,4,5,6,7,8,9,]
    useEffect(()=>{
        //getToprated(sort,main.currentpage)

        getPopular(main.type,main.currentpage)

    })
    const getPopular=(type,page)=>{
        Axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`)
        .then(res=>{
            setmain({
                movielist:res.data.results
            })
        })
    }

    const getnext=()=>{
        Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${6}`)
        .then(res=>{
            setmain(
                [...movielist,...data]
            ) 
           
        })
        return main.movielist
    }

    /*const getnext=()=>{
        Axios.get('https://api.themoviedb.org/3/genre/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1')
        .then(res=>{
            setmain({
                popular:res.data.results
            })
        })
    }*/

    const log=()=>{
        console.log(main.popular)
    }

    const nav=()=>{
        navigation.push('Details')
    }
    const display=()=>{
        navigation.navigate('Details',item)
    }

    const link ='https://image.tmdb.org/t/p/w500'

    const getrest=()=>{
        setmain({
            currentpage:main.currentpage+1
        })
        getPopular(main.type,main.currentpage)
    }
    const displaymovies=()=>{
        return(
            <View>
               
                <FlatGrid
            keyExtractor={(item)=>item.id}
            itemDimension={80}
            spacing={10}
            data={main.movielist}
            style={styles.grid}
            renderItem={({ item })=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Details', item)}>
                    <Card poster={item.poster_path}>

                    </Card>
                </TouchableOpacity>
                
            )}
            
            ></FlatGrid>
            </View>
        )
    }
    return(
        <View>
            <Button style={styles.btn} width='50' color='green' title='log movies' onPress={displaymovies} />
            {/*<Button color='green' title='display movies' onPress={log} />*/}
            
            {/*<SectionGrid 
            keyExtractor={key=>key.id}
            itemDimension={90}
            sections={[
                {title:'popular',data:main.movielist},
                {title:'trending',data:main.trending},
                {title:'top picks',data:main.movielist},

            ]}
            style={styles.grid}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Details',item)}>
                    
                    <Card poster={item.poster_path}>
                    
                    </Card>                   
                </TouchableOpacity>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}/>*/}
                
               

                  <Text>{link}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    text:{
        color:'blue',
        fontWeight:'bold',
        fontSize:30,
        
    },
    btn:{
        color:'red',

    },
    movies:{
        //backgroundColor:'teal',
        margin:10,
        //padding:10,
        //color:'white',
        //fontSize:30,
        display:'flex'
    },
    container :{
        //flex:2
        display:"flex",
        //flexDirection:'row'
    },
    grid:{
        marginTop:20,
        backgroundColor:'grey'

    },
    sectionHeader:{
        backgroundColor:'black',
        height:30,
        color:'white',
        fontSize:20


    },
    background:{
        width:140,
        height:150,
        
    }

})
export default Home
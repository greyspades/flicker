import React, { useState,useEffect } from 'react'
import { Text, View,TouchableOpacity,Image,StyleSheet,FlatList,Button } from 'react-native'
import Axios from 'axios'
import {FlatGrid} from 'react-native-super-grid'
import Card from '../shared/card'


const Trending=({navigation})=>{
    const [main,setmain]=useState({
        trending:''
    })
    useEffect(()=>{
        getTrending('2')
        getTrending('3')
        
    })

    var page=['1','2','3','4',]

    const getTrending=(page)=>{
        //Axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1')
        
                Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${page}`) 
                .then((res)=>{
                    setmain({
                        trending:res.data.results
                    })
                })
       
      
    }
    const log =()=>{
        console.log(main.trending)
    }
    return(
        <View>
            <Button title={'log'} onPress={log} />
            <Text>carmine</Text>
            <FlatGrid
            itemDimension={80}
            style={styles.grid}
            spacing={10}
            data={main.trending}
            renderItem={({ item })=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Details', item)}>
                    <Card poster={item.poster_path}>

                    </Card>

                </TouchableOpacity>
             
            )}></FlatGrid>

            
            
            
         
        </View>


        
    )
}
const styles=StyleSheet.create({
    grid:{
        marginTop:20,
        backgroundColor:'grey',
        
    },

})
export default Trending
import {AsyncStorage} from 'react-native'
import Axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import {navigationRef} from '../navigator'

export const logIn=(user)=>{
    return {
        type:'LOG IN',
        user
    }
}


export const getStorage=(user)=>{
  return async (dispatch)=>{
    const userAge = await AsyncStorage.getItem("key")
    let info=JSON.parse(userAge)
   let user={
       username:info.name,
       password:info.password
   }
  
  if(user !=null){
    Axios.post(`https://flickmeet-1.herokuapp.com/log_in`,{user})
    .then( (res)=>{
        console.log('trive')
        //console.log(res.data.info)
        dispatch({type:'SET USER',user:res.data.info})
        
        
    })
  }
   //dispatch({type:'GET STORAGE',user:user})
   
  }
}
import React,{useState,useEffect,useRef} from 'react'
import {Animated, Text, View,StyleSheet,Button,TouchableOpacity,ActivityIndicator} from 'react-native'
import Axios from 'axios'
import AnimatedSplash from 'react-native-animated-splash-screen'

//import Animated,{Easing} from 'react-native-reanimated'

const Placeholder=()=>{
    //const value=useState(new Animated.ValueXY({x:0,y:0}))[0]
    
    const value=new Animated.ValueXY({x:0,y:0})

    //const anim=useRef(new Animated.ValueXY({x:0,y:0}).current)
    function move() {
        
        Animated.timing(value,{
            toValue:{x:200,y:70},
            duration:1000,
            useNativeDriver:false,
        }).start();
    }
    return(<View style={{width:'100%',height:'100%',backgroundColor:'maroon'}}>
        
    
         
         <Animated.View style={value.getLayout()}>
             <View style={{width:100,height:100,backgroundColor:'white',borderRadius:50}}>

             </View>
       
         </Animated.View>
         
         <Button title='move' onPress={()=>{move()}}/>
        </View>
        
    )   
}
/*const [Value,timing]=Animated;
class Placeholder extends React.Component{
    constructor(props){
        super(props)
        this._transX=new Value(0)
        this._config={
            duration:5000,
            toValue:180,
            easing:Easing.inOut(Easing.ease)
        }
        this._anim=timing(this._transX.this._config);
    }
    render(){
        return(<View style={{width:'100%',height:'100%',backgroundColor:'maroon',transform:[{translateX:this._transX}]}}>
    
         
         <Animated.View style={{width:100,height:100,backgroundColor:'white'}}>
       
         </Animated.View>
         
         <Button title='move' onPress={()=>{this._anim.start()}}/>
        </View>
        
    )
    }
}*/

export default Placeholder;
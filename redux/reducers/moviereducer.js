import { ActivityIndicator } from "react-native"
import { ScaleAnimation } from "react-native-modals"


const initialState={
    movies:[],
    upcomingMovies:[],
    nextUCM:[],
    series:[],
    page:1,
    update:[],
    showSplash:true,
    series:[],
    seriesUpdate:[],
    isLogedIn:false,
    userInfo:{},
    favourites:[],
    storage:{},
    genres:[],
    nextgenre:[]

}

const movieReducer=(state=initialState,action)=>{
   
    if(action.type=='SET MOVIES'){

        return {
            ...state,
            //...state.movies,
           movies:[...state.update, ...action.item]
           }
        }
    
    else if(action.type=='NEXT PAGE'){
        return{
            ...state,
            page:state.page+1
        }
    }
    else if(action.type=='UPDATE MOVIES'){
        return {
            ...state,
            //...state.update,
            //update:[...state.update,...action.update]
            update:[...state.movies,action.update.shift()]
        }

    }
    else if(action.type=='CLOSE SPLASH'){
        return {
            ...state,
            showSplash:false,
        }
    }
    else if(action.type=='SHOW SPLASH'){
        return {
            ...state,
            showSplash:true
        }
    }
    else if(action.type=='SET SERIES'){
        return {
            ...state,
            series:[...state.seriesUpdate,...action.item]
        }
    }
    else if(action.type=='UPDATE SERIES'){
        return {
            ...state,
            seriesUpdate:[...state.series,action.item.shift()]
        }
    }
    else if(action.type=='LOG IN'){
        return {
            ...state,
            isLogedIn:true,
            userInfo:action.user.info,
        }
    }
    else if(action.type=='ADD TO FAVOURITES') {
        return {
            ...state,
            favourites:action.item
        }
    }
    else if(action.type=='SET USER'){
        return {
            ...state,
            isLogedIn:true,
            userInfo:action.user,
        }
    }
    else if(action.type=='GET STORAGE') {
        return {
            ...state,
            storage:action.user
        }
    }
    else if(action.type=='GET UPCOMING'){
        return {
            ...state,
            //upcomingMovies:[...]
        }
    }
    else if(action.type=='CLEAR MOVIES') {
        return {
            ...state,
            movies:null,
            update:null
        }
    }
    else if(action.type=='SET UCM'){
        return {
            ...state,
            upcomingMovies:[...state.nextUCM,...action.item]
        }
    }
    else if(action.type=='UPDATE UCM'){
        return {
            ...state,
            nextUCM:[...state.upcomingMovies,action.item.shift()]
        }
    }
    else if(action.type=='SET GENRES'){
        return {
            ...state,
            genres:[...state.nextgenre,...action.item]
        }
    }
    else if(action.type=='UPDATE GENRES'){
        return {
            ...state,
            nextgenre:[...state.genres,action.item.shift()]
        }
    }
    return state;
}

export default movieReducer
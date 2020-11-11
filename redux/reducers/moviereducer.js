

const initialState={
    movies:[],
    series:[],
    page:1,
    update:[]
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
            update:[...state.movies,action.update]
        }

    }
   
    
    return state;
}

export default movieReducer
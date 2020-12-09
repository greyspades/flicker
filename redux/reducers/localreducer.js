import { createStore,applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"
import movieReducer from './moviereducer'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';
 
const initialSTate={
  username:'',
  password:''
}
const userReducer=(state=initialSTate,action)=>{
  if(action.type=='SET USER'){
    return {
      ...state,
      username1:action.username,
      password1:action.password,
    }
  }
  return state
}
const rootReducer=combineReducers({
  movieReducer,
  userReducer
})

const persistConfig = {
  key: 'root',
  storage:ExpoFileSystemStorage,
  whitelist:['userReducer']
}
 
const persistedReducer = persistReducer(persistConfig, movieReducer)

const store = createStore(persistedReducer,applyMiddleware(thunk))
  const persistor = persistStore(store)
/*export default () => {
  
  return { store, persistor }
}*/
export {store,persistor}
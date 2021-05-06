import {combineReducers} from 'redux'
import loginReducer from './login'

//整合所有reducer汇总所有状态
export default combineReducers({
    //该对象里的key和value决定着store里保存该状态的key和value
    userInfo:loginReducer
})
import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'
//尝试从localStorage中读取之前保存的信息
let user = JSON.parse(localStorage.getItem('user'))
let id = localStorage.getItem('id')
let initState={
    username:user || '',
    id:id || ''
}

export default function test(perState=initState,action) {
    const {type,data} = action 
    let newState
    switch (type) {
        case SAVE_USER_INFO:
            newState = {username:data.username,id:data.id}
            return newState
        case DELETE_USER_INFO:
            newState = {username:'',id:''}
            return newState
        default:
            return perState
    }
}
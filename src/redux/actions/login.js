import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'
//创建保存用户信息的action
export const createSaveUserInfoAction = data => {
    //向localStorage中保存用户信息
    localStorage.setItem('user',JSON.stringify(data.username))
    //向localStorage中保存id
    localStorage.setItem('id',data.id)
    return {type:SAVE_USER_INFO,data}
}
//创建删除用户信息的action
export const createDeleteUserInfoAction = () => {
    //向localStorage中删除用户信息
    localStorage.removeItem('user')
    //向localStorage中删除id
    localStorage.removeItem('id')
    return {type:DELETE_USER_INFO}
}

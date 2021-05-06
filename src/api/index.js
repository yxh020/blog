/* 
  负责发送项目中所有请求
*/
import ajax from './ajax'
import {BASE_URL} from '../config/index'

//注册请求
export const reqRegister = (username,password)=>ajax.post(`${BASE_URL}/register`,{username,password})
//登录请求
export const reqLogin = (username,password)=>ajax.post(`${BASE_URL}/login`,{username,password})
//获取文章分类请求
export const getSort = (id)=>ajax.post(`${BASE_URL}/getsort`,{id})
//更新文章分类请求
export const updateSort = (id,arr)=>ajax.post(`${BASE_URL}/updatesort`,{id,arr})
//添加文章请求
export const addText = (title,username,sort,text) =>ajax.post(`${BASE_URL}/addtext`,{title,username,sort,text})
//请求文章
export const reqText = (data) =>ajax.post(`${BASE_URL}/reqtext`,{data})
//更新评论请求
export const updateComment = (_id,username,comment) =>ajax.post(`${BASE_URL}/updatecomment`,{_id,username,comment})
//获取所有评论
export const getComments = (_id)=>ajax.post(`${BASE_URL}/getcomments`,{_id})
//请求更多文章
export const getMoreText = (_id) =>ajax.post(`${BASE_URL}/getmoretext`,{_id})
//翻页
export const getLast = (a) =>ajax.post(`${BASE_URL}/getlast`,{a})
//查询个人信息
export const getUserInfo = (id) =>ajax.post(`${BASE_URL}/getuserinfo`,{id})
//删除文章
export const deleteText = (date) =>ajax.post(`${BASE_URL}/deletetext`,{date})
//删除用户
export const deleteUser = (date) =>ajax.post(`${BASE_URL}/deleteuser`,{date})

export const find = (date) =>ajax.post(`${BASE_URL}/find`,{date})

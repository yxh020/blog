import axios from 'axios'
import qs from 'querystring'
//import NProgress from 'nprogress'
//import {message} from 'antd'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000, //配置超时时间
    //设置跨域cookie
    withCredentials:true
})

//请求拦截器
instance.interceptors.request.use((config) => {
    //进度条开始
    //NProgress.start()
    //console.log('1',config.data.nowcomment);
    const {method,data} = config
    if (method.toLowerCase() === 'post' ){
        //若传过来的参数是对象，则转换成urlencoded形式
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    //console.log('2',config.data);
    return config
})

//响应拦截器
instance.interceptors.response.use(
    
    (response) => {
        //进度条结束
        //console.log(response)
        //NProgress.done()
        //若请求成功，返回数据
        
        return response.data
    },
    (err) => {
        //进度条结束
        // NProgress.done()
        // if(err.response.status === 401){
        //     message.error('身份校验失败，请重新登录',1)
        // }else{
        //     //请求若失败，提示错误（这里可以处理所有请求的异常）
        //     message.error(err.message,1)
        //     //中断Promise链
        //     return new Promise(() => {})
        // }
        //message.error(err.message,1)
        //return new Promise(() => {})
    }
)
export default instance
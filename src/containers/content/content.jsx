import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {reqText,getMoreText,getLast,find} from '../../api'
import {HeartFilled} from '@ant-design/icons'
import {nanoid} from 'nanoid'

import './content.less'
import {message,Button,Input} from 'antd'
import { connect } from 'react-redux'
@connect(
    state=>({}),
    {}
)
class Content extends Component {
    state={
        dataArr: [],
        
    }
    //请求文章
    async componentDidMount(){
       let result =await reqText(1)
        //console.log(result.status);
        if(result!==undefined){
            if(result.status===0){
                //console.log('11111');
                this.setState({dataArr:result.data })
            }
        }else{message.error('网络差，请稍后再试！',1)}        
        
    }
    //获取更多文章请求
    getMore =async () => {
        let dataArr1 = this.state.dataArr
        let arrLength = dataArr1.length
        //let _id=dataArr1.reverse()[0]._id
        let _id=dataArr1[--arrLength]._id
        //console.log(_id);
        let result =  await getMoreText(_id)
        if(result.status>0&&result.status!==undefined){
            message.info('无更多内容',0.5)
        }else{
            if(result!==undefined){
                if(result.status===0){
                    this.setState({dataArr:result.data })
                }
            }else{message.error('网络差，请稍后再试！',1)} 
        }
    }
    //翻页
    getLastText = async () => {
        let result =  await getLast(0)
        console.log(result);
        if(result.status>0){
            message.info('前面没有内容了',0.5)
        }else{
            this.setState({dataArr:result.data.reverse() })
        }
    }
    myRef = React.createRef()
    find = async() => {
        console.log(this.myRef.current.state.value);
        let value = this.myRef.current.state.value
        if(value!==undefined){
            let value1 = value.trim()
            let result = await find(value1)
            //console.log(result);
            if(result!==undefined){
                if(result.status===0){
                    //console.log('11111');
                    this.setState({dataArr:result.data })
                }
            }else{message.error('网络差，请稍后再试！',1)}  

        }
        
    }
    blur = () => {
        //console.log('失去焦点')
        let value = this.myRef.current.state.value
        console.log(value);
        if(value!==undefined){
            let value1  = this.myRef.current.state.value.trim()
            if(value1.length<1){
                let value1 = value.trim() 
                if(value1===''){
                 window.location.replace("http://localhost:3000/home")
             }
             }
        }
        
        
    }
    
    render() {
        const{dataArr} = this.state
        return (
            <div className="content">
                <Input ref={this.myRef} className='content_input' onBlur={this.blur} onPressEnter={this.find} placeholder="输入关键字查询" />
                {/* <div ><input type="text"/></div> */}
                <div>
                    <ul>
                        {
                          dataArr.map((data) => {
                            return  <div key={nanoid()}><li  className="content_li">
                                        <Link to={{pathname:'/detail',state:{node_id:data._id}}}>
                                            <h1 className="content_title">{data.title}</h1>
                                        </Link>
                                        <p className="content_p" dangerouslySetInnerHTML={{__html:data.text.slice(0,300)+'...'}}></p>
                                    </li>   
                                    <span className="content_span">
                                    {'\u00A0'}{data.username}
                                    {'\u00A0\u00A0\u00A0\u00A0'}<HeartFilled />{'\u00A0'}
                                    {data.star}{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{data.date.slice(0,19)}
                                </span> 
                                <hr className="content_hr"/>
                                </div>
                          })
                        }
                    </ul>
                </div>
                <Button 
                onClick={this.getMore}
                style={{width:'100%', border:'none',backgroundColor:'#a5a5a5',margin:'15px 0 15px 0'}} 
                type="primary" shape="round" size={'large'}>
                下一页
                </Button>
                <Button 
                onClick={this.getLastText}
                style={{width:'100%', border:'none',backgroundColor:'#a5a5a5',margin:'0 0 50px 0'}} 
                type="primary" shape="round" size={'large'}>
                上一页
                </Button>
                <div></div>
            </div>
        )
    }
}
export default Content 
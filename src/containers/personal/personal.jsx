import React, { Component} from 'react'
import './personal.less'
import { message,Button,Modal} from 'antd'
import {nanoid} from 'nanoid'
import {getUserInfo,deleteText,deleteUser} from '../../api'

export default class Personal extends Component{
    state={
        textdata:[],
        visible: false ,
        deletedate:'',
        deleteuser:'',
        userdata:[],
        status:'',
        isShow:false
    }

    async componentDidMount (){
        let id = localStorage.getItem('id') 
        //console.log(id);
        //发送请求
        let result = await getUserInfo(id)
        if(result!==undefined){
            //console.log(result);
            const {status,data} = result
           // console.log(status,data);
            if(status===0){
                //console.log('普通用户');
                //普通用户只展示自己的文章
                this.setState({textdata:data.textdata})
            }else if(status===2){
                //console.log('管理员账户');
                //管理员展示所有文章和所有账户
                this.setState({textdata:data.textdata,userdata:data.userdata,status:2})
            }else{
                message.info('查询失败',1)
            }
        }else{
        //没联网
           message.success('网络差',0.5)
        }
        
    }
    
    handleOk = async e => {
        this.setState({visible: false})
        let deletedate = this.state.deletedate
        let userdate = this.state.deleteuser
        //发送删除请求
        if(userdate!==''){
            this.setState({deleteuser:''})
            let result = await deleteUser(userdate)
            //console.log(result);
            if(result!==undefined&&result.status===0){
                message.success('删除成功',0.5)
                window.location.replace("http://localhost:3000/personal")
            }else{message.success('网络差',0.5)}
        }else{
            let result = await deleteText(deletedate)
            //console.log(result);
            if(result!==undefined&&result.status===0){
                window.location.replace("http://localhost:3000/personal")
                message.success('删除成功',0.5)
            }else{message.success('网络差',0.5)}
        }
        
    }
    
    handleCancel = e => {
        this.setState({visible: false})
    }
    deleteText = (event) => {
        this.setState({visible: true,})
        let deletedate = event.target.parentNode.parentNode.innerHTML.slice(0,23)
        //.firstChild
        if(deletedate[0]>=2){
            // console.log(deletedate[0]);
            // console.log(deletedate);
            this.setState({deletedate})
        }else{
            console.log('22');
            let deletedate = event.target.parentNode.parentNode.innerHTML.slice(4,27)
            this.setState({deletedate})
        }
    }
    deleteUser = (event) => {
        this.setState({visible: true,})
        let deleteuser = event.target.parentNode.parentNode.innerHTML.slice(0,23)
        //.firstChild
        if(deleteuser[0]>=2){
            // console.log(deletedate[0]);
            //console.log(deleteuser);
            this.setState({deleteuser})
        }else{
            let deleteuser = event.target.parentNode.parentNode.innerHTML.slice(4,27)
            //console.log(deleteuser);
            this.setState({deleteuser})
        }
    }
    updateInfo = () => {
        console.log('---');
        this.setState({isShow:true})
    }

    render(){
        const textdata = this.state.textdata
        const userdata = this.state.userdata
        const status = this.state.status
        return <div className='personal'>
            <div className='personal_m'>用户管理</div>
            {/* <div onClick={this.updateInfo}>修改资料</div>  */}
            <div className="personal_text_div">
                <div className='personal_text_div_time'>所有文章</div>
                {/* <div className='personal_text_div_time'>发布时间</div> */}
                {/* <p>发布时间</p> */}
                    <div className='title_li'>
                        {   
                            textdata?textdata.map((a) => {
                                return <li className='text_title_li' key={nanoid()}>{a.title}
                                </li>
                            }):null
                            
                        }
                    </div>
                    <div className='title_date'>
                        {
                            textdata?textdata.map((a) => {
                                return <li className='text_date_li' key={nanoid()}>{a.date}
                               <Button 
                                type="link"
                                onClick={this.deleteText}
                                size={'small'}
                                style={{float:'right',marginRight:'10px',color:'red'}}
                                >
                                删除</Button>
                                <Modal 
                                title="提示" 
                                mask={false}
                                style={{boxShadow:'none'}}
                                visible={this.state.visible} 
                                onOk={this.handleOk} 
                                onCancel={this.handleCancel}
                                cancelText='取消'
                                okText='确定'>
                                <p>确定删除吗</p>
                                </Modal>
                                </li>
                            }):null
                        }
                    </div>
            </div>
            {
                status>1?<div className='personal_user_div'>
                <div className='personal_text_div_time'>所有用户</div>
                {/* <div className='personal_user_div_time'>注册时间</div> */}
                <div>
                    <div className='personal_user_li_div'>
                        {
                            userdata?userdata.map((a) => {
                                return <li className='personal_user_li' key={nanoid()}>{a.username}</li>
                            }):null
                        }  
                        <div className='personal_user_li__div'>
                        {
                            userdata?userdata.map((a) => {
                                return <li className='text_date_li_' key={nanoid()}>{a.date}
                                <Button 
                                type="link"
                                onClick={this.deleteUser}
                                size={'small'}
                                style={{float:'right',marginRight:'10px',color:'red'}}
                                >
                                删除</Button>
                                <Modal 
                                title="提示" 
                                mask={false}
                                style={{boxShadow:'none'}}
                                visible={this.state.visible} 
                                onOk={this.handleOk} 
                                onCancel={this.handleCancel}
                                cancelText='取消'
                                okText='确定'>
                                <p>确定删除吗</p>
                                </Modal>
                                </li>
                            }):null
                        }
                    </div>
                    </div>
                    
                </div>
                </div>:null
            }
            {this.state.isShow?<div className='info'>
                <form >
                <p>新密码</p><input type="string"/>
                <p>年龄</p><input type="number"/>
                <br/>
                <button>确认修改</button>  
                </form>
            </div>:null}
            
        </div>
    }
}

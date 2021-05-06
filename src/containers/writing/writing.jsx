import React, { Component } from 'react'
import RichTextEditor from './rich_text_editor'
import {Link} from 'react-router-dom'
import {Button,Input,message,Select,Modal,Form} from 'antd'
import {getSort,updateSort,addText} from '../../api'
import {PlusOutlined,PlusCircleFilled} from '@ant-design/icons';
import {nanoid} from 'nanoid'
import './writing.less'
import { connect } from 'react-redux'
const { Option } = Select;

@connect(
    state=>({user:state.userInfo}),
    {}
)
class Writing extends Component {
    state={
        showAdd:false,
        sort:[],
        visible:false,
        titleValue:'',
        sendSort:'',
        isShow:false
    }

    //组件挂载后发送请求获取用户的分类
    async componentDidMount (){
        //console.log(this.props.user.id);
        let result = await getSort(this.props.user.id)
        //console.log(result)
        if(result!==undefined){
            if(result.status===0){
                const {sort} = result.data
                this.setState({sort})
            }else {
                message.warning('当前网络差，请稍后再试')
            }
        }else{}
        
        
    }

    //新建分类的回调
    addSort = () => {
        this.setState({showAdd:!this.state.showAdd})
    }
    valueRef = React.createRef()
    //提交按钮回调
    submit = async() => {
        //获取输入内容
        const value = this.valueRef.current.state.value
        if(value===undefined){}else{
            if(!value.trim()){
                message.info('输入不能为空！',0.5)
            }else{
                //发送添加分类的请求
                let sortArr = this.state.sort
                //let oldLength = sortArr.length
                sortArr.unshift(value.trim())
                //console.log(sortArr);
                let result = await updateSort(this.props.user.id,sortArr)
                if(result){
                    message.success('添加成功',1)
                    this.setState({})
                    //)
                }else{
                    message.error('添加失败',1)
                    this.setState({sort:[]})
                }
                //关闭输入框
                this.setState({showAdd:!this.state.showAdd})
            }
        }
    }
    //标题的回调
    titleValue = (event) => {
        
    }
    //取消的回调
    cancel = () => {
        this.setState({showAdd:!this.state.showAdd})
    }
    //点击分类按钮的回调
    sortValue = (event) => {
        let value = event.target.innerHTML
        if(value.length<=10){
            console.log(value);
        }else{}
        //console.log(event.target.innerHTML);
    }
    //分类下拉框的回调
    handleChange = (value) => {
        //console.log(`selected ${value}`);
        this.setState({sendSort:value})
    }
    //发表按钮回调
    publish = () => {
        //console.log('dian le ');
        this.setState({
            visible: true,
        });
    }
    handleOk = async e => {
        //console.log(e);
        this.setState({
          visible: false,
        });
        const username =this.props.user.username
        const {sendSort:sort,titleValue:title} = this.state
        if(sort){
            if(title){
                let text = this.RichText.getRichText()
                //发送添加文章的请求
                let result =await addText(title,username,sort,text)
                if(result!==undefined){
                    message.success('发表成功',1)
                    console.log(result);
                    this.setState({isShow:false})
                }else{message.info('网络差，请稍后再试！',1)}
                
            }else{}
        }else{message.info('分类是必选的！',1)}
    };
    handleCancel = e => {
        //console.log(e);
        this.setState({
          visible: false,
        });
    };
    onFinish = (values) => {
        this.setState({
            visible: true,
        })
        this.setState({titleValue:values.title})
      //console.log('Success:', values);
    };
    showWriting_editor = () => {
        let isShow = this.state.isShow
        this.setState({isShow:!isShow})
    }
   
    render() {
        const {sort} = this.state
        //console.log(this.state.sort); 
        return (
            <div className="writing_div">
                <div className="writing_left">
                    <Link to="/home">
                    <Button className="writing_left_home" type="primary" shape="round"  size='large' ghost='true'>
                        回首页
                    </Button></Link>
                    <button onClick={this.addSort}
                     style={{color:'white', fontSize:"15px",outline:'none',backgroundColor:'rgba(255,0,0,0)',border:'none'}}>
                    <PlusOutlined/>新建分类</button>
                    <div>
                    {
                        this.state.showAdd?<div>
                            <Input 
                            ref={this.valueRef}
                            style={{backgroundColor:'#595959',marginTop:'10px',marginBottom:'12px',color:'white'}} 
                            placeholder="请输入分类名..." 
                            maxLength="10"
                            bordered= {false}
                            size='large'/>
                            <Button 
                            onClick={this.submit}
                            type="primary" shape="round" size='middle' ghost='true'
                            style={{color:'	 #33cc00',borderColor:'	 #33cc00'}}>
                            提交</Button>
                            <Button onClick={this.cancel} style={{color:'#999999',marginLeft:'10px'}} type="link">取消</Button>
                        </div>:null
                    }
                    </div>
                    <div onClick={this.sortValue} className="sort_div">
                        {
                            sort?
                            sort.map((a) => {
                                return <li className='sort_div_li' key={nanoid()}>{a}</li>
                            }):null
                        }
                    </div>
                </div>
                   <div className="add_div" onClick={this.showWriting_editor}><PlusCircleFilled /> 新建文章</div>
                   { this.state.isShow?
                    <div className='writing_editor'>
                    <h1 className='editor_h1'>标题</h1>
                    <Form
                       onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: '标题不能为空!' },
                                {max:30,message: '标题最多为30位!',},
                                {pattern:/^[^\s]*$/,message: '标题不能含空格'},]}
                    >
                    <Input size="large" autoComplete="off" placeholder="在此输入标题"/>
                    </Form.Item>

                    <h2 className='editor_h2'>分类</h2> 
                    <Select defaultValue="--选择分类--" style={{ width: '100%' }} onChange={this.handleChange}>
                        {   
                            sort?
                            sort.map((a) => {
                                return <Option key={nanoid()} value={a}>{a}</Option>
                            }):null
                        }
                        
                    </Select>
                    <Form.Item >
                    <h3 className='editor_h3'>正文
                    <Button
                     //onClick={this.publish}
                     htmlType="submit"
                     type="primary" ghost={true}
                     style={{width:'120px',float:'right',marginRight:'10px'}} 
                     shape="round" size={'large'}>发表</Button>
                    </h3> </Form.Item>
                    </Form>
                    <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <p>确定发表吗？</p>
                    </Modal>
                    <div className='editor'><RichTextEditor ref={c=>this.RichText=c} /></div>
                    
                </div>
                    :<div className='writing_div2'>简 绘</div>
                }   
                
            </div>
        )
    }
}
export default Writing
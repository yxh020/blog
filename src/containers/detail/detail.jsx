import React, { Component } from 'react'
import Header from '../header/header'
import {Input,BackTop,Button,Form,Modal, message} from 'antd'
import {nanoid} from 'nanoid'
//import {Link} from 'react-router-dom'
//import {LikeFilled} from '@ant-design/icons'
import {reqText,updateComment,getComments,getLast} from '../../api'
import './detail.less'
// import {text} from '../../config/text'
// const dataArr = text
export default class detail extends Component {
    state={
        text:{date:'1111111111'},
        visible: false,
        values:'',
        comments:[]
    }
    async componentDidMount(){
        const {node_id} = this.props.location.state
        //console.log(node_id); 
        let result = await reqText(node_id)
        //console.log(result);
        this.setState({text:result.data[0]})
        //获取文章的评论
        let result2 =await getComments(this.state.text._id)
        //console.log('hqpl',result2);
        const {status,comments} = result2
        if(status===0){
            this.setState({comments})
        }else{

        }
    }
    style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#ea6f5a',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };
    handleOk = async e => {
        //console.log(e);
        this.setState({
          visible: false,
        });
        //当前登录用户的username\
        let comment = this.state.values.comment.trim()
        let username = JSON.parse(localStorage.getItem('user'))
        //当前文章的_id和评论
        const {_id} = this.state.text
        //发送评论的请求
        if(username){
            let result = await updateComment(_id,username,comment)
            console.log(result);
            if(result.status===0){
                message.success('评论成功',1)
                window.location.replace("http://localhost:3000/detail")
                
            }else{

            }
        }else{message.info('登录才可以评论！',1)}
        
    };
    //点返回的回调
      handleCancel = e => {
       // console.log(e);
        this.setState({
          visible: false,
        });
      };
    //发布按钮回调
    onFinish = (values) => {
        this.setState({visible: true});
        this.setState({values});
        
    };
    getLastText = async () => {
        let result =  await getLast(0)
        console.log(result);
        if(result.status>0){
            message.info('前面没有内容了',0.5)
        }else{
            this.setState({dataArr:result.data.reverse() })
        }
    }
    
    render() {
        // let date = this.state.text.date.slice(0,10)
        // console.log(date);
        const{text} = this.state
        const { TextArea } = Input;
        const {comments} =this.state
        return (
            
            <div className='div_detail'>
                <Header/>
                <div onClick={this.getLastText} className='div_detail_home'>
                {/* <Link to='/home'>
                <Button ghost={true} type="primary" shape="round" size={'large'}>
                回首页
                </Button>
                </Link> */}
                </div>
                <div className="detail">
                    <div className="detail_div">
                    <h1 className="detail_h1">{text.title}</h1> 
                    <h2 className="detail_h2">作者：{text.username}</h2>
                    <h3>{text.date.slice(0,19)}</h3>
                    <span className="detail_span" dangerouslySetInnerHTML={{__html:text.text}}></span>
                    </div>
                    <div className="detail_comment_">
                    <Form
                    //initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="comment"
                        rules={[{ required: true, message: '请输入你的评论!' },{max:50,message:'最多只能输入50个字符'}]}
                    >
                    <TextArea className="comment_text" placeholder="写下你的评论..." size={'large'} onChange={this.onChange} showCount maxLength={50}/>
                    </Form.Item>
                    <Button 
                    // onClick={this.showModal}
                     htmlType="submit" style={{float:"right"}} type="primary" shape="round" size={'large'}>
                    发布
                    </Button>
                    <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>确定发布吗？</p>
                    </Modal>
                    </Form>
                        <span className="detail_comment">评论</span>
                        <article className="detail_comment_value">
                            {
                                comments.map((a) => {
                                    return <li key={nanoid()}>
                                        <p className="comment_username_p">{Object.keys(a)} :</p>
                                        <p className="comment_value_p">{Object.values(a)} </p>
                                    </li>
                                })
                            }
                        </article>
                    </div>
                </div>
                <BackTop>
                    <div style={this.style}>UP</div>
                </BackTop>
                {/* <div className='like_div'>
                    <div className='like_filled_div'>
                    <LikeFilled style={{marginLeft:'15px',marginTop:'14px'}} />
                    </div>
                </div> */}
            </div>
        )
    }
}

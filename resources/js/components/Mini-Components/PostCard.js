import React,{useState,useEffect,useRef} from 'react'
import './../../../sass/postcard.scss'
import { Menu, Dropdown } from 'antd';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import prof from './../../assets/els-fattah-224428.png'
import arrow from './../../assets/Asset3.png'
import { useSelector } from 'react-redux';
import rhtml from 'react-html-parser'
import Axios from 'axios';
import { message } from 'antd'


function PostCard(props) {

const auth = useSelector(state=>state.auth)
const [comment,setComment] = useState('');
const inputRef= useRef()
const trigger = useRef()

var menuItem = ''
if((props.user && auth.user) ){
  
    if(props.user.id === auth.user.sub){
      menuItem = <Menu.Item key="2"><a href="#">Delete</a></Menu.Item>
    }
  
}

function triggerOnClick(){
  if((inputRef.current.style.display === "none" || inputRef.current.style.display === "") && inputRef.current.id == props.id ){
    inputRef.current.style.display = "block"
  }
  else{
    inputRef.current.style.display = "none"
  }
}

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">Copy Link</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Report Abuse</a>
          </Menu.Item>
          {menuItem}
        </Menu>
      );

      function submitComment(e){
        e.preventDefault()

        const class_id = props.classId;
        const user_id = auth.user.sub;
        const post_id = props.id;
        const form = {class_id,user_id,post_id,comment}
        if(comment){
          Axios.post('/api/postComment',form)
          .then(savedComment => {
            message.success("Successfully Posted")})
          .catch(error=> console.log(error))
        }
      }


    return (
        <div className="post">
        <div className="info">
            <div className="profile">
                <div className="avatar" style={{backgroundImage: "url("+ prof +")"}}></div>
                <div className="nameDate">
                  {props.user && 
                    <p>{props.user.name}</p>}
                    <p>Aug 22, 2019</p>
                </div>

                <Dropdown overlay={menu} trigger={['click']}>
           <a className="menuIcon ant-dropdown-link" onClick={e => e.preventDefault()}><div></div></a>
                </Dropdown>

            </div>
            <div className="content">
              {props.content &&
                <div style={{textAlign:'left'}}>{rhtml(props.content)}</div>}
                <br/>
                <div style={{display: 'flex',alignItems:'center'}}>
                <Link style={{color: "#f0f0f0"}} to={'/classes/'+props.classId+'/post/'+props.id}><small><FontAwesomeIcon icon={['fas','comment']} color="gray" size="lg" className="mx-2 "/>{props.comments.length} comments</small></Link>
                <a style={{fontSize: '11.52px',marginLeft:'20px'}} onClick={triggerOnClick} ref={trigger}>Post a comment</a>
                </div>
                
            </div>
            
        </div>
        <div className="inputSection" ref={inputRef} id = {props.id}>

            <div className="innerInput">
            <div className="avatar" style={{backgroundImage: "url("+prof+")"}}></div>
            <div className="inputHolder"><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add Class Comment"/>
            <div className="arrow" onClick={submitComment} style={{backgroundImage: "url("+arrow+")"}}></div>
            
            </div>
            </div>
        </div>
    </div>
    )
}

export default PostCard

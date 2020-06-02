import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import rhtml from 'react-html-parser'
import './../../sass/singlePostPage.scss'
import prof from './../assets/els-fattah-224428.png'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Dropdown } from 'antd';

function SinglePostPage(props) {
    const [classId, setClassId] = useState()
    const [postId, setPostId] = useState()
    const [postData, setPostData] = useState()
    const [comments, setComments] = useState([])
    const auth = useSelector(state=>state.auth)
    

    useEffect(()=>{
        var rawUrl = window.location.pathname;
        var splitUrl = rawUrl.split('/');
        setClassId(splitUrl[2])
        setPostId(splitUrl[4])   
        
        if(!postData){
            fetchData()
        }
     
    })

  

    function fetchData(){
        Axios.get('/api/class/post/'+postId)
        .then(res=>{
            setPostData(res.data)
            setComments(res.data.comments)
        })
        .catch(error=>console.log(error))
    }

    var menuItem = ''
    if((props.user && auth.user) ){
      
        if(props.user.id === auth.user.sub){
          menuItem = <Menu.Item key="2"><a href="#">Delete</a></Menu.Item>
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


var com = ''
if(comments){
    com = comments.map((comms,index) =><div key={index}><h4>{comms.comment}</h4></div>)
}

    return (
        <div className="text-center main">

            <div className="text-center container post">

            <div className="info">
            <div className="profile">
                <div className="avatar" style={{backgroundImage: "url("+ prof +")"}}></div>
                <div className="nameDate">
                  {auth.user && 
                    <p>{auth.user.name}</p>}
                    <p>Aug 22, 2019</p>
                </div>

                <Dropdown overlay={menu} trigger={['click']}>
           <a className="menuIcon ant-dropdown-link" onClick={e => e.preventDefault()}><div></div></a>
                </Dropdown>

            </div>
            <div className="content">
              {postData &&
                <div style={{textAlign:'left'}}> {postData &&
                    rhtml(postData.post)
                }    </div>}
                <br/>
                <p><small><FontAwesomeIcon icon={['fas','comment']} size="lg" className="mx-2 "/>{comments && comments.length} comments</small></p>
            </div>
            
        </div>


                   
                    
            
            </div>
        </div>
    )
}

export default SinglePostPage

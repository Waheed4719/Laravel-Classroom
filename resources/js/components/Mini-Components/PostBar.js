import React, { useEffect, useState } from 'react'
import './../../../sass/postbar.scss'
import prof from './../../assets/els-fattah-224428.png'
import {PaperClipOutlined, UploadOutlined} from '@ant-design/icons'
import { Menu, Dropdown, message, Button } from 'antd';
import Upload from './Upload'
import Axios from 'axios';
function PostBar(props) {
    const [post, setPost] = useState('')
    const [img, setImg] = useState({})


  

function PostBarToggler(){
    var postBar = document.querySelector('.postBar')
    var placeholder = document.querySelector('.ph')
    var avatar = document.querySelector('.av')
    var textArea = document.querySelector('textarea')
    var btns = document.querySelector('.btns')
    var antBtn = document.querySelector('.ant-btn')
    
    function open(){
        placeholder.style.display="none"
        avatar.style.display="none"
        textArea.style.display="block"
        textArea.style.marginLeft="0px"
        textArea.style.float="left"
        postBar.style.padding="24px"
        postBar.style.flexDirection="column"
        postBar.style.height="200px"
        postBar.style.width="120px"
        btns.style.display="flex"
    }
    
    function close(){
        var postBar = document.querySelector('.postBar')
        var placeholder = document.querySelector('.ph')
        var avatar = document.querySelector('.av')
        var textArea = document.querySelector('textarea')
        var btns = document.querySelector('.btns')
        var antBtn = document.querySelector('.ant-btn')

        placeholder.style.display="block"
        avatar.style.display="block"
        textArea.style.display="none"
        postBar.style.height=""
        postBar.style.padding=""
        postBar.style.flexDirection=""
        postBar.style.alignItems=""
        postBar.style.backgrounColor="red"
        btns.style.display=""
        // antBtn.style.display="none"
    }

    document.addEventListener('click',(e)=>{
        if(event.target.closest('.postBar') && (!event.target.closest('.cancel'))) {
            open()
        }
        else{
            close()
        }
    })

  return {
      close: close
  }


    
}

    useEffect(()=>{
        PostBarToggler()
    },[])

    const cancel=(e)=>{
        e.preventDefault()
        console.log('clicked')
    
    var textArea = document.querySelector('textarea')
    textArea.value = ""
 
    }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">Google Drive</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Link</a>
          </Menu.Item>
          <Menu.Item key="2">
            <Upload />
          </Menu.Item>
        </Menu>
      );




    const submitHandler=(e)=>{
          e.preventDefault()
          e.target.value=""  
          console.log(post)
          const form = new FormData()
          form.append('post',post)
          form.append('class_id',props.class_id)
          Axios.post('/api/class/makePost',form)
          .then(savedPost=>{
            message.success('Successfully Posted')
            props.postFunction()  
            console.log(savedPost)
            setPost('')
            let func = PostBarToggler()
            func.close()
            })
          .catch(error=>console.log(error.response))
      }
    return (
        <div className="postBar">
      
            <div className='avatar av'  style={{backgroundImage: "url("+ prof +")"}}></div>
            <p className="ph">Share something with your class</p>
            <textarea placeholder="Share something with your class" value={post} onChange={(e)=>setPost(e.target.value)}/>
            <div className="btns">
            <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()} className="btn-outline" style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                <PaperClipOutlined style={{  padding:'0px 3px' ,fontSize: '16px', color: '#08c' }} />Add</a>
            </Dropdown>
                <div className="postCancelGrp">
                <a className="btn-outline cancel" onClick={(e)=>cancel(e)}>Cancel</a><a onClick={(e)=>submitHandler(e)} className="btn-outline" >Post</a>
                </div>
            
            </div>
            
        </div>
    )
}

export default PostBar

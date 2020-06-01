import React, { useEffect, useState } from 'react'
import './../../../sass/postbar.scss'
import prof from './../../assets/els-fattah-224428.png'
import {PaperClipOutlined, UploadOutlined} from '@ant-design/icons'
import { Menu, Dropdown, message, Button } from 'antd';
import Upload from './Upload'
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';


function PostBar(props) {
    const [post, setPost] = useState('')
    const [img, setImg] = useState({})
    var edit = document.querySelector('.editor')
    var placeholder = document.querySelector('.ph')

    

function PostBarToggler(){
    var postBar = document.querySelector('.postBar')
    var placeholder = document.querySelector('.ph')
    var avatar = document.querySelector('.av')
    var btns = document.querySelector('.btns')
    var antBtn = document.querySelector('.ant-btn')
    var edit = document.querySelector('.editor')
    
    if(edit && placeholder.style.display !== "none"){
         edit.style.display="none"
    }
    else{
        edit.style.display="block"
    }
  
    function open(){
        
        placeholder.style.display="none"
        avatar.style.display="none"
        edit.style.display="block"
        edit.style.width ="100%"
        postBar.style.padding="24px"
        postBar.style.flexDirection="column"
        postBar.style.height="300px"
        postBar.style.width="120px"
        btns.style.display="flex"
    }
    
    function close(){
        var postBar = document.querySelector('.postBar')
        var placeholder = document.querySelector('.ph')
        var avatar = document.querySelector('.av')
        var textArea = document.querySelector('.TA')
        var btns = document.querySelector('.btns')
        var antBtn = document.querySelector('.ant-btn')

        placeholder.style.display="block"
        avatar.style.display="block"
        edit.style.display="none"
        postBar.style.height=""
        postBar.style.padding=""
        postBar.style.flexDirection=""
        postBar.style.alignItems=""
        postBar.style.backgrounColor="red"
        btns.style.display=""
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

     const handleEditorChange = (content, editor) => {
        console.log( content)
        setPost(content)
      }
    



    const submitHandler=(e)=>{
          e.preventDefault()
          const form = new FormData()
          form.append('post',post)
          form.append('class_id',props.class_id)
          Axios.post('/api/class/makePost',form)
          .then(savedPost=>{
            message.success('Successfully Posted')
            props.postFunction()  
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
           <div className="editor">
           <Editor
            apiKey="ovfon26lvler8sv8l1motzvleku3ydjmmfi3vdhg20zs7va2"
            init={{
            height: 200,
            width: "100%",
            placeholder: "Ask a question or post an update...",
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
                'formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | image | help'
            }}
            onEditorChange={handleEditorChange}
            />
           </div>
          
            <div className="btns">
            <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()} className="btn-outline" style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                <PaperClipOutlined style={{  padding:'0px 3px' ,fontSize: '16px', color: '#08c' }} />Add</a>
            </Dropdown>
                <div className="postCancelGrp">
                <a className="btn-outline cancel" >Cancel</a><a onClick={(e)=>submitHandler(e)} className="btn-outline" >Post</a>
                </div>
            
            </div>
            
        </div>
    )
}

export default PostBar

import React, { useEffect, useState } from 'react'
import './../../../sass/upload.scss'
import {PaperClipOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Axios from 'axios'
import { message, Popover} from 'antd'
function Upload(props) {
    const [img, setImg] = useState([])

    function UpFile(){
        var btn = document.querySelector('.upload-btn')
        var fileInput = document.querySelector('.fileInput')
        var submitBtn = document.querySelector('.submit')
        
        btn.addEventListener('click',(e)=>{
           e.stopImmediatePropagation()
            fileInput.click(function(event){
                event.stopImmediatePropagation()
                event.stopPropagation();
            },false)
            
        })
   
        submitBtn.addEventListener('click',(e)=>{
            e.stopPropagation()
            e.preventDefault();
            uploadFile(e)
        })
    }

    function uploadFile(){
        var submitBtn = document.querySelector('.submit')
        const form = new FormData()
        for (let index = 0; index < img.length; index++) {
            const element = img[index];
            form.append('image',element)
            Axios.post('/api/image-upload',form)
            .then(success=>{
                submitBtn.style.display="none"
                message.success('successfully uploaded files')
                console.log(success.data)
                setImg([])
            })
            .catch(error=>console.log(error))
            
        }
      
       
    }
    
    function onChangeHandler(e){
        console.log(e.target.files)
        console.log(e.target.files.length)
        var submitBtn = document.querySelector('.submit').style.display="inline-block"
 
        let i = 0
        var images = []
        while (i<e.target.files.length) {
            var element = e.target.files[i];
            images.push(element)
            i++
        }
        setImg([...img,...images])
        
    }

    function deleteImage(e){
        const index = e.target.parentElement.parentElement.getAttribute("index")
        const submitBtn = document.querySelector('.submit')
        const newImg = [...img]
        newImg.splice(index,1)
        setImg(newImg)

        if(img.length<=1){
            console.log('yes')
            submitBtn.style.display="none"
        }
        console.log(img)
    }


    useEffect(()=>{
        UpFile()
    })
    console.log('h1',img)
    var imgs = ""
    if(img && img.length > 0){
        imgs = img.map((im,index)=><div className="filename" key={index}><Popover placement="right" content={im.name}><p>{im.name} </p></Popover><DeleteOutlined index={index} onClick={e=>deleteImage(e)} /></div>)
    }   
   
   

    return (
        <div className="uploadFile">
            <input className="fileInput" type="file" multiple onChange={e=>onChangeHandler(e)} />
            <a className="btn-outline upload-btn"><PaperClipOutlined/> File </a>
            <a className="btn-outline submit" style={{display:"none",marginLeft:"10px"}} > <UploadOutlined/> </a>

            <div className="files">
               {imgs}
            </div>
        </div>
    )
}

export default Upload

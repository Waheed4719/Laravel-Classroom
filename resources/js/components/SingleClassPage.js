import React, { useEffect, useState } from 'react'
import './../../sass/SingleClassPage.scss'
import scape from './../assets/Img_1.png'
import prof from './../assets/els-fattah-224428.png'
import arrow from './../assets/Asset3.png'
import PostCard from './Mini-Components/PostCard'
import TodoAside from './Mini-Components/TodoAside'
import PostBar from './Mini-Components/PostBar'
import caret from './../assets/caret.png'
import Axios from 'axios'

function SingleClassPage(props) {
    const [classData, setClassData] = useState({})
    const [classPosts, setClassPosts] = useState([])

    var flag = false

    function roomInfoToggle(){
        var roomInfo = document.querySelector('.roomInfo')
        var caret = document.querySelector('.caretIcon')
        var coverImage = document.querySelector('.coverImage')
        caret.addEventListener('click',()=>{
            if(flag===false){
                // roomInfo.style.transform = "translateY(0%)"
                roomInfo.style.display= "flex"
                
                coverImage.style.borderBottomLeftRadius="0px"
                coverImage.style.borderBottomRightRadius="0px"
                flag = true
            }
            else{
                // roomInfo.style.transform = "translateY(-100%)"
                roomInfo.style.display= "none"
                coverImage.style.borderBottomLeftRadius=""
                coverImage.style.borderBottomRightRadius=""
                flag = false
            }
            
        })

    }
    function getClass(){
        Axios.get('/api/classes/'+ props.match.params.class)
        .then(cls => {
           
            setClassData(cls.data.obj)
        })
        .catch(error=>console.log(error))
    }

    function classPostsCall(){
        Axios.get('/api/class/allPosts/'+ props.match.params.class)
        .then(dat=>{
            console.log(dat) 
            setClassPosts(dat.data)
        })
        .catch(error=>console.log(error))
    }


    useEffect(()=>{
        roomInfoToggle()
        getClass()
        classPostsCall()
    },[])

  

    var cp = []

    if(classPosts){
        cp=classPosts.map((clsp,index)=><PostCard key={index} content={clsp.post}  faculty={clsp.faculty} user={clsp.user}   />)
    }
    
    return (
        <div className="singleClass">
            <br/>
            <div className="coverImage" style={{backgroundImage:"url("+scape+")"}}>  
            <div className="title">
            <h1>{classData.name}</h1>
            <p>Summer 2020</p>
            </div>
            <div className="caret"><img className="caretIcon" src={caret}/></div>
            </div>
            <div className="roomInfo"><p><strong>Room code: </strong>{classData.room_code}</p></div>
            <div className="divRow">

                <aside >
                <TodoAside/>
                </aside>

                <main className="posts">
                    
                    <PostBar postFunction={classPostsCall} class_id={props.match.params.class}/>
                    {cp}
                    {/* <PostCard/> 
                    <PostCard/>
                    <PostCard/> */}
              
                </main>
                
            </div>


        </div>
    )
}

export default SingleClassPage

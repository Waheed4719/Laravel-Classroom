import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './../../sass/SingleClassPage.scss'
import backdrop from './../assets/backdrop.jpg'
import PostCard from './Mini-Components/PostCard'
import TodoAside from './Mini-Components/TodoAside'
import PostBar from './Mini-Components/PostBar'
import caret from './../assets/caret.png'
import Axios from 'axios'
import { useSelector } from 'react-redux'


function SingleClassPage(props) {
    const [classData, setClassData] = useState({})
    const [classPosts, setClassPosts] = useState([])
    const [isFaculty, setIsFaculty] = useState(false)
    const auth = useSelector(state=>state.auth)
    // var notif = document.getElementsByClassName('.tox-icon')
    var notif = document.querySelector('.mce-notification')

    var flag = false

    function roomInfoToggle(){
        var roomInfo = document.querySelector('.roomInfo')
        var caret = document.querySelector('.caretIcon')
        var coverImage = document.querySelector('.coverImage')
        caret.addEventListener('click',()=>{
            if(flag===false){
                roomInfo.style.display= "flex"
                coverImage.style.borderBottomLeftRadius="0px"
                coverImage.style.borderBottomRightRadius="0px"
                flag = true
            }
            else{
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
           let classInfo = cls.data.obj
            setClassData(classInfo)
          
        })
        .catch(error=>console.log(error))
    
    }

    function classPostsCall(){
        Axios.get('/api/class/allPosts/'+ props.match.params.class)
        .then(dat=>{
            setClassPosts(dat.data)
        })
        .catch(error=>console.log(error))
    }


    useEffect(()=>{
      
        roomInfoToggle()
        getClass()
        classPostsCall()
      
       
    },[props.match.params.class])

    

    useEffect(()=>{
        if(classData.faculty && auth.user.sub === classData.faculty.id){

            setIsFaculty(true)
        }
    },[classData, auth.user])

  

    var cp = []

    if(classPosts){
      
        cp=classPosts.map((clsp,index)=><PostCard key={index}  content={clsp.post} comments={clsp.comments} classId ={props.match.params.class} id={clsp.id}  faculty={clsp.faculty} user={clsp.user}   />)
    }

    
  
    
    return (
        <div className="singleClass">
            <br/>
            <div className="section" style={{display:"flex",justifyContent:"center"}}>
            <Link to={'/classes/'+props.match.params.class}><p className="mx-2 activeSection">Stream</p></Link> <span>|</span>
            <Link to={'/classes/'+props.match.params.class + '/resources'}> <p className="mx-2">Resources</p></Link> <span>|</span>
            <Link to={'/classes/'+props.match.params.class + '/people'}>    <p className="mx-2">People</p></Link>
            </div>
            <div className="coverImage" style={{backgroundImage:"url("+backdrop+")"}}>  
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
                 
              
                </main>
                
            </div>


        </div>
    )
}

export default SingleClassPage

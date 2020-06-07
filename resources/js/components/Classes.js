import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../../sass/classes.scss'
import {Empty, Result, message, Modal, Button} from 'antd'
import ClassCard from './Mini-Components/ClassCard'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyClasses} from './../actions/classActions'
function Classes() {
    const auth = useSelector(state=>state.auth)
    const cls = useSelector(state=>state.cls)
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [classes, setClasses] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        if(cls.myClasses){
            setClasses(cls.myClasses)
        }
    },[cls])

    function Submit(){
        const data = {code}
        Axios.post('api/classes/joinClass',data)
        .then(obj=>{
            message.success(`Successfully enrolled in ${obj.data.class.name}`)
            getMyClasses()})
        .catch(error=>{
            console.log(error)
        })
    }



    var clss = []
    let i = 0
    if(classes){
        clss = classes.map((cls,index)=><ClassCard key={index} id={cls.id} title={cls.name} fac_id = {cls.faculty.id} faculty={cls.faculty.name} />)
       
    }
    
 

    return (
        <div className="classes">
            <br/>
            {classes?
            <div className="clss">{clss}</div>:
            <div>
            <Empty description={false} />
            <p>No Classes joined yet</p>
                </div>
        }
        <br/>
        {classes?
        <h1 style={{color:"white"}}>Join a class!</h1>
        :<h1 style={{color:"white"}}>Didn't join any classes yet? Join now!</h1>
        }
            <div className="classCode">
            <p>Enter Code: </p><input style={{backgroundColor: "#3F4355", border:"none"}} placeholder="Class code" onChange={(e)=>setCode(e.target.value)}/>
            </div>
            <button onClick={Submit}>Join</button>
            <br/>
            <h4 style={{color:"white"}}>Or</h4>
            <br/>
            <Link className="button" to="/classes/createAClass" style={{backgroundColor:"snow",color: "#fff",backgroundColor: "#3F4355"}} >Create a Class</Link>
            <br/>
        </div>
    )
}

export default Classes

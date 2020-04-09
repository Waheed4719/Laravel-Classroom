import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../../sass/classes.scss'
import {Empty, Result, message, Modal, Button} from 'antd'
import ClassCard from './Mini-Components/ClassCard'
import { useSelector } from 'react-redux'
import {expiredToken,idNotFound} from './../utils/errorTypes'

function Classes() {
    const auth = useSelector(state=>state.auth)
    const [code, setCode] = useState('')
    const [classes, setClasses] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(auth.user.name){
            console.log('hello')
            getMyClasses()
        }
        
    
    },[auth])

    function getMyClasses(){
        Axios.get('api/myClasses')
        .then(classes=>{
            console.log(classes.data)
            setClasses(classes.data.classes)
        })
        .catch(error=>{
       console.log(error)  
        })
    }
    function Submit(){
     
        const data = {code}
        Axios.post('api/classes/joinClass',data)
        .then(obj=>{
            console.log(obj.data)
            message.success(`Successfully enrolled in ${obj.data.class.name}`)
            getMyClasses()})
        .catch(error=>{
            console.log(error)
            console.log(error.response)   
        })
    }


    var cls = []
    let i = 0
    if(classes){
        
        cls = classes.map((cls,index)=><ClassCard key={index} id={cls.id} title={cls.name} faculty={cls.faculty.name} />)
       
    }
    
    const handleCancel = () =>{
        setVisible(false)
    }
    const modalOpen = () =>{
        setVisible(true)
    }
    const onOk = () =>{
        setLoading(true)
        setTimeout(()=>{
            setVisible(false)
            setLoading(false)
        },2000)
    }

    return (
        <div className="classes">
            <br/>
            {classes?
            <div className="clss">{cls}</div>:
            <div>
            <Empty description={false} />
            <p>No Classes joined yet</p>
                </div>
        }
        <br/>
        {classes?
        <h1>Join a class!</h1>
        :<h1>Didn't join any classes yet? Join now!</h1>
        }
            <div className="classCode">
            <p>Enter Code: </p><input placeholder="Class code" onChange={(e)=>setCode(e.target.value)}/>
            </div>
            <button onClick={Submit}>Join</button>
            <br/>
        {/* <button onClick={modalOpen}>+</button>
            <Modal
          title="Join a class"
          visible={visible}
          onOk={Submit}
          confirmLoading={loading}
          onCancel={handleCancel}
        >
            <p>Ask you teacher to give you the class code and then enter it here.</p>
            <input className="modalInput" placeholder="Class code" onChange={(e)=>setCode(e.target.value)}/>
            </Modal> */}
            <br/>
        </div>
    )
}

export default Classes

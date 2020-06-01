import React, { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link, Redirect, useHistory} from 'react-router-dom'
import './../../../sass/faculty_dashboard.scss'
import Axios from 'axios'
import ClassCard from '../Mini-Components/ClassCard'
import { message, Modal, Dropdown } from 'antd'
import {create_class} from './../../actions/classActions'

function Dashboard() {
    const fac = useSelector(state=>state.fac)
    const [ className,setClassName ] = useState('')
    const [ classes, setClasses ] = useState([])
    const [ visible, setVisible ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const clss = useSelector(state=>state.cls)

    useEffect(() => {
        fetchApi()
    }, [])

    function fetchApi(){
        Axios.get('api/classes')
        .then(classes=>{
            setClasses(classes.data.obj)
        })
        .catch(error=>console.log(error))
    }

    const Submit=(e)=>{
        e.preventDefault()
        const form = new FormData
        form.append('name',className)
        dispatch(create_class(form, history))
        setTimeout(()=>{
        fetchApi()
        },[500])
        
    }
    const inputHandler = (e) =>{
        e.preventDefault()
        setClassName(e.target.value)
    }

    function handleOk(e){
        setVisible(false)
    }

    function handleCancel(){
        setVisible(false)
    }


    var cls = ""
    if(classes){
        cls = classes.map((cld,index) =>  
        <ClassCard key={index} title={cld.name} id={cld.id} image={''} created_time={cld.created_at} faculty={fac.faculty.name} >
        <p>Room Code: {cld.room_code}</p>
      </ClassCard>)
    }

    return (
        <div className="dashboard p-2">

     
         <h1>Create a Class</h1>
        <form onSubmit={(e)=>Submit(e)}>
            <label>Class Name</label> <input onChange={(e)=>inputHandler(e)} name="className" placeholder="Class Name" />
            <button type="submit" className="btn-Outline">Create class</button>
        </form>
        <br/>
        <div className="clss">
        {cls}
        </div>
        
        
        </div>
    )
}

export default Dashboard

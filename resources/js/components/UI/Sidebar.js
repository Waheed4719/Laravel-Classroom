import React,{useState,useEffect} from 'react'
import './../../../sass/sidebar.scss'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import {getMyClasses} from '../../actions/classActions'


function Sidebar() {
const auth = useSelector(state=>state.auth)
const cls = useSelector(state=>state.cls)
const [classes,setClasses] = useState([])
const dispatch = useDispatch()  

    useEffect(()=>{
        if(auth.user.name){
            dispatch(getMyClasses())
        }
    },[auth])

    useEffect(()=>{
        if(cls.myClasses){
            setClasses(cls.myClasses)
        }
    },[cls])



    return (
        <div className="sidebar">
            <div className="nav"><a className="ham-menu"><div></div></a></div>
            <div>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <FontAwesomeIcon icon={['fas','search']}  style={{ color: "mediumslateblue"}}/>
                
            </div>
            <div className="enrolled">
                <p>Enrolled</p>
                <ul>
                    {classes && classes.map((cls,index)=><li  key={index}><Link to={'/classes/'+cls.id}>{cls.name}</Link></li>)}
                </ul>
            </div>
            </div>
           
        </div>
    )
}

export default Sidebar

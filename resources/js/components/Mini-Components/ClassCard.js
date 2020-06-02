import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './../../../sass/classcard.scss'
import backdrop from './../../assets/backdrop.jpg'
import {Popover} from 'antd'
import {FolderOutlined, LaptopOutlined, FrownFilled } from '@ant-design/icons'
import {useSelector} from 'react-redux'

function ClassCard(props) {

const auth = useSelector(state=>state.auth)
    return (
        <div className="classCard" >
           <div className="cover" style={{backgroundImage:"url("+backdrop+")"}}>
                <p><Link to={"/classes/"+props.id}>{props.title}</Link></p>
                <p>Summer 2020</p>
                <p>{props.faculty}</p>
                <div className="avatar" ></div>
           </div>
           <div className="desc">
           </div>
           <div className="resc">

               <Popover  content="Your work">
               <Link to={"/classes/"+props.id+"/workToDo"}><span className="r-icon">
               <LaptopOutlined />
               </span></Link>
               </Popover>

               <Popover  content="Resources">
               <Link to={"/classes/"+props.id+"/resources"}><span className="r-icon">
               <FolderOutlined />
               </span></Link>
               </Popover>

           </div>
        </div>
    )
}

export default ClassCard

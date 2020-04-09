import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './../../../sass/classcard.scss'
import scape from './../../assets/Img_1.png'
import {Popover} from 'antd'
import {FolderOutlined, LaptopOutlined } from '@ant-design/icons'

function ClassCard(props) {
    console.log(props.id)
    return (
        <div className="classCard" >
           <div className="cover" style={{backgroundImage:"url("+scape+")"}}>
                <p><Link to={"/classes/"+props.id}>{props.title}</Link></p>
                <p>Summer 2020</p>
                <p>{props.faculty}</p>
                <div className="avatar" ></div>
           </div>
           <div className="desc">

           </div>
           <div className="resc">

               <Popover  content="Your work">
               <Link to="/workToDo"><span className="r-icon">
               <LaptopOutlined />
               </span></Link>
               </Popover>

               <Popover  content="Resources">
               <Link to="/resources"><span className="r-icon">
               <FolderOutlined />
               </span></Link>
               </Popover>

           </div>
        </div>
    )
}

export default ClassCard

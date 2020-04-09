import React,{useState,useEffect} from 'react'
import './../../sass/sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Sidebar() {

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
                    <li>Laravel_React_2020</li>
                    <li>MERN_2020</li>
                    <li>Express_React_2020</li>
                </ul>
            </div>
            </div>
           
        </div>
    )
}

export default Sidebar

import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './../../sass/SingleClassPage.scss'
import './../../sass/postbar.scss'
import  Upload  from './Mini-Components/Upload'
function Resources(props) {


    useEffect(()=>{
     var rawUrl = window.location.pathname;
     var splitUrl = rawUrl.split('/');
    })
    return (
        <div className="singleClass">
        <br/>
            <div className="section" style={{display:"flex",justifyContent:"center"}}>
            <Link to={'/classes/'+props.match.params.class}><p className="mx-2">Stream</p></Link> | 
            <Link to={'/classes/'+props.match.params.class + '/resources'}><p className="mx-2 activeSection">Resources</p></Link> | 
            <Link to={'/classes/'+props.match.params.class + '/people'}><p className="mx-2">People</p></Link>
            </div>

        <div className="text-center mt-2 " style={{display: "flex",flexDirection:"column"}}>
            <h1>This is the Resources Page</h1>
       
            
            
        </div>



        </div>
    )
}

export default Resources

import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './../../sass/SingleClassPage.scss'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function People(props) {

    const auth = useSelector(state=>state.auth)
    const [people,setPeople] = useState([])
    const [faculty, setFaculty] = useState()
    var mounted = false

    useEffect(()=>{
    var url = window.location.pathname
    var newUrl = url.split("/")
    var class_id = newUrl[2]
    if(!people.length){
        getPeople(class_id)
    }
        
    },[people])

    function getPeople(class_id){
        var students = []
        var faculty = []
        Axios.get('/api/classes/'+class_id+'/getPeople')
        .then(res=>{
            
            console.log(res.data.classPop[0].user.id)
            if(mounted == false){
                for(var i =0; i< res.data.classPop.length; i++){
                    if(res.data.classPop[i].user.id == res.data.class[0].faculty){
                        console.log('matched')
                        console.log("faculty",res.data.classPop[i].user)
                        setFaculty(res.data.classPop[i].user)
                    }
                    else{
                        students.push(res.data.classPop[i].user)
                    }
                }
                console.log(students)
                setPeople(students)
            }
            mounted = true
        })
        .catch(error=>console.log(error))
    }

    return (
        <div className="singleClass">
            <br/>
            <div className="section" style={{display:"flex",justifyContent:"center"}}>
                <Link to={'/classes/'+props.match.params.class}><p className="mx-2">Stream</p></Link> | 
                <Link to={'/classes/'+props.match.params.class + '/resources'}><p className="mx-2">Resources</p></Link>  | 
                <Link to={'/classes/'+props.match.params.class + '/people'}>    <p className="mx-2 activeSection">People</p></Link>
            </div>

            <div className="text-center mt-2">
            <h1>This is the People Page</h1>

            <div className="text-center">
                
            </div>
        </div>
        </div>
    )
}

export default People

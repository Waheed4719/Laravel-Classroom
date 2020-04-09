import React, {useState,useEffect} from 'react'
import './../../../sass/Login.scss'
import {Link, useHistory, Redirect} from 'react-router-dom'
import {Facultylogin} from './../../actions/facultyActions'
import {useDispatch, useSelector} from 'react-redux'
import Axios from 'axios'


function Login() {

const dispatch = useDispatch()  
const fac = useSelector(state => state.fac)
const history = useHistory();
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')




useEffect(()=>{

    var nameInput = document.querySelector('input')
var passInput = document.querySelectorAll('input')[1]
if(nameInput){
    nameInput.addEventListener('keyup',()=>{
        if(nameInput.value === ''){
            nameInput.style.border = "1px solid red"
            nameInput.parentElement.querySelector('p').innerHTML = " username cannot be empty"
            nameInput.parentElement.querySelector('p').style.visibility = "visible"
        }
        else{
            nameInput.style.border = ""
            nameInput.parentElement.querySelector('p').innerHTML = ""
            nameInput.parentElement.querySelector('p').style.visibility = "hidden"
        }
        
    })
    
    
    passInput.addEventListener('keyup',()=>{
        if(passInput.value === ''){
            passInput.style.border = "1px solid red"
            passInput.parentElement.querySelector('p').innerHTML = " password cannot be empty"
            passInput.parentElement.querySelector('p').style.visibility = "visible"
        }
        else{
            passInput.style.border = ""
            passInput.parentElement.querySelector('p').innerHTML = ""
            passInput.parentElement.querySelector('p').style.visibility = "hidden"
        }
        
    })
    
}


},[])


function submitForm(e){
    e.preventDefault()
    
    const email = username;
    const form = {email,password}
    console.log(form)
    dispatch(Facultylogin(form,history))

    // Axios.post('api/faculty/login',form)
    // .then(user=> console.log(user.data))
    // .catch(error=>console.log(error))
}


    return (
        <div className="login">
           {fac.faculty.name? <Redirect to="/faculty" /> :
            
            <form >
            <h1>Faculty Sign in</h1>
            
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder="username" name="username"  onChange={(event)=>setUsername(event.target.value)}/>
                    <p className="username-error">hello</p>
                </div>
                
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="password" name="password" onChange={(event)=>setPassword(event.target.value)}/>
                    <p className="password-error">hello</p>
                </div>
                <small><Link to="/faculty_register">Don't have an account?</Link></small>
                <button href="#" className="signin-button" onClick={(e)=>submitForm(e)} >Sign in</button>
                
            </form>
}
        </div>
    )
}

export default Login

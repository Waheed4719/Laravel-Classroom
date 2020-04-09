import React, {useState,useEffect} from 'react'
import './../../sass/Login.scss'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect, useHistory } from 'react-router-dom'
import { message } from 'antd'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();


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
    
    
    const form = {name,email,password}
    console.log(form)
    
    Axios.post('api/register',form)
    .then(json=>{
        message.success('User Successfully Registered')
        setTimeout(()=>{
            history.push('/login')
        },2000)
        
      
    })
    .catch(error=>{
        console.log(error)
    })

}

    return (
        
                <div className="login">
           
           
           <form >
           <h1>Sign Up</h1>
                <div>
                   <label htmlFor="name">Name:</label>
                   <input type="text" placeholder="name" name="name"  onChange={(event)=>setName(event.target.value)}/>
                   <p className="email-error"></p>
               </div>
           
               <div>
                   <label htmlFor="email">Email:</label>
                   <input type="text" placeholder="email address" name="email"  onChange={(event)=>setEmail(event.target.value)}/>
                   <p className="email-error"></p>
               </div>
               
               <div>
                   <label htmlFor="password">Password:</label>
                   <input type="password" placeholder="password" name="password" onChange={(event)=>setPassword(event.target.value)}/>
                   <p className="password-error"></p>
               </div>
               
               <button href="#" className="signin-button" onClick={(e)=>submitForm(e)} >Sign in</button>
               
           </form>
          
       </div>
       
    )
}

export default Register

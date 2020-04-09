
import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './../../../sass/header.scss'
import { useSelector,useDispatch } from 'react-redux'
import {Menu, Dropdown} from 'antd'
import { logout } from '../../actions/authActions'
import Sidebar from './../Sidebar'
import prof from './../../assets/els-fattah-224428.png'


function Header (){


const history = useHistory()
const auth = useSelector(state=>state.auth)
const fac = useSelector(state=>state.fac)
const dispatch = useDispatch()
const atag = document.querySelectorAll('.nl')
var flag = false


function logOut(e){
  e.preventDefault
  dispatch(logout(history))  
}
useEffect(()=>{
  const sidebar = document.querySelector('.sidebar')
  const ham = document.querySelector('.nav-icon')
  const input = document.querySelector('.search-bar input')
  const ham2 = document.querySelector('.ham-menu')
  const hams = [ham,ham2]

  hams.forEach(item => {
    item.addEventListener('click',()=>{
      if(flag === false){
        sidebar.style.transform="translateX(0%)"
        input.style.transform= "scale(1)"
        flag = true
    }
    else{
        sidebar.style.transform="translateX(-100%)"
        input.style.transform= "scale(0)"
        flag = false
    }
    })
  })


},[])


useEffect(() => {
  const atag = document.querySelectorAll('.nl')
  let i = 0;
 for(i=0;i<atag.length;i++){
   
   if(atag[i].pathname === window.location.pathname){
    atag[i].style.color = "#2b73d5" 
    atag[i].style.borderBottom = "4px solid #1967d2"
   }

   else{
    atag[i].style.color = "#5c96f6"
    atag[i].style.borderBottom = ""
   }

   
 }
}, [window.location.pathname])


useEffect(()=>{

},[])

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Logout</a>
    </Menu.Item>
    
  </Menu>
);

return(

  <div>
      <nav className='header'>
          <a className="nav-icon"><div></div></a>
          <Link className='brand' to='/'>LaraExams</Link>
          
          <Link className="nl"  to='/classes'>Classes</Link>
          {fac && fac.faculty.name?<Link className="nl" to="/faculty">Fac Dashboard</Link>:<Link className="nl" to="/faculty_login">Faculty</Link>}
          {auth && auth.user.name?
          <Link to="#" onClick={(e)=>logOut(e)} >Logout</Link>:
          <Link to="/login" >User</Link>
           }
           <Dropdown overlay={menu} trigger={['hover']}>
          <div className="avatar" style={{backgroundImage: "url("+ prof +")"}}></div>
          </Dropdown>
        
      </nav>
        <Sidebar/>
  </div>
      
)}

    export default Header
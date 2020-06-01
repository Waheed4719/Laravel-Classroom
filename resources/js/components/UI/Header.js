
import React, {useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './../../../sass/header.scss'
import { useSelector,useDispatch } from 'react-redux'
import {Menu, Dropdown, Modal} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { logout } from '../../actions/authActions'
import Sidebar from './../Sidebar'
import prof from './../../assets/els-fattah-224428.png'

function Header (){


const history = useHistory()
const auth = useSelector(state=>state.auth)
const dispatch = useDispatch()
const atag = document.querySelectorAll('.nl')
var flag = false
const [visible,setVisible] = useState(false)
const [visible2,setVisible2] = useState(false)

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
// var pathcond = false
// if(window.location.pathname==='/faculty'){
//   pathcond = true;
// }
var pathcond = true
const menu2 = (
  <Menu>
    {pathcond &&
 <Menu.Item key="0">
 <a href="#" onClick={showModal2}>Create a class</a>
</Menu.Item>}
    
   
    <Menu.Item key="1">
      <a href="#" onClick={showModal}>Join a class</a>
    </Menu.Item>
    
    
  </Menu>
);

function handleCancel(e){
  e.preventDefault()
  setVisible(false)
  setVisible2(false)
}

function handleOk(e){
  e.preventDefault()
  setVisible(false)
  setVisible2(false)
}



function showModal(e){
  e.preventDefault()
  setVisible(true)
}
function showModal2(e){
  
  e.preventDefault()
  setVisible2(true)
}

return(

  <div>
      <nav className='header'>
          <a className="nav-icon"><div></div></a>
          <Link className='brand' to='/'>LaraExams</Link>
          {auth.isAuthenticated &&
          <Dropdown overlay={menu2} trigger={['click']}>
          <Link className="plus" to='#'  > + </Link>
          </Dropdown>}
      
        
        <Modal
          title="Join a class"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <label htmlFor="class_code"><strong>Class code: </strong></label>
          <input className="ml-3 pl-2" name="class_code" placeholder="e.g wR5Jq3" />
        </Modal>



        <Modal
          title="Create a class"
          visible={visible2}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{display:"flex",flexDirection:"column"}}
        >
          <label htmlFor="class_code"><strong>Room Name: </strong></label>
          <input className="ml-3 p-1" placeholder="room name" />
          <label htmlFor="class_code"><strong>Subject: </strong></label>
          <input className="ml-3 p-1" placeholder="subject" />
          
        </Modal>
          
          
          <Link className="nl"  to='/classes'>Classes</Link>
          {/* {fac && fac.faculty.name?<Link className="nl" to="/faculty">Fac Dashboard</Link>:<Link className="nl" to="/faculty_login">Faculty</Link>} */}
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
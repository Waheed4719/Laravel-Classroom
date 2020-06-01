import React from 'react'
import './../../../sass/postcard.scss'
import { Menu, Dropdown } from 'antd';
import scape from './../../assets/Img_1.png'
import prof from './../../assets/els-fattah-224428.png'
import arrow from './../../assets/Asset3.png'
import userAlt from './../../assets/Portrait_Placeholder.png'
import { useSelector } from 'react-redux';
import rhtml from 'react-html-parser'
function PostCard(props) {

const auth = useSelector(state=>state.auth)
const fac = useSelector(state=>state.fac)

const flag = false;
var menuItem = ''
if((props.user && auth.user) ){
  
    if(props.user.id === auth.user.sub){
      menuItem = <Menu.Item key="2"><a href="#">Delete</a></Menu.Item>
    }
  
}
 else if(( props.faculty && fac.faculty)){
 
    if(props.faculty.id === fac.faculty.sub){
      menuItem = <Menu.Item key="2"><a href="#">Delete</a></Menu.Item>
    }
 

 }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">Copy Link</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Report Abuse</a>
          </Menu.Item>
          {menuItem}
        </Menu>
      );


    return (
        <div className="post">
        <div className="info">
            <div className="profile">
                <div className="avatar" style={{backgroundImage: "url("+ prof +")"}}></div>
                <div className="nameDate">
                  {props.faculty? 
                    <p>{props.faculty.name}</p>:<p>{props.user.name}</p>}
                    <p>Aug 22, 2019</p>
                </div>

                <Dropdown overlay={menu} trigger={['click']}>
           <a className="menuIcon ant-dropdown-link" onClick={e => e.preventDefault()}><div></div></a>
                </Dropdown>

            </div>
            <div className="content">
              {props.content?
                <p>{rhtml(props.content)}</p>:
                    <p>September 4th is the deadline to submit the hard copy of your Final Report (individually) containing 
                    Task 8 - Research Proposal (minimum 2 pages), 
                    Task 7 - Summary of 10 papers (minimum 3 pages in Latex), Task 6 - First pages only of your selected 10 papers and the key paper, 
                    Task 1 - RM-5 progress document.</p> }
            </div>
        </div>
        <div className="inputSection">
            <div className="innerInput">
            <div className="avatar" style={{backgroundImage: "url("+prof+")"}}></div>
            <div className="inputHolder"><input placeholder="Add Class Comment"/>
            <div className="arrow" style={{backgroundImage: "url("+arrow+")"}}></div>
            
            </div>
            
            </div>
        </div>
    </div>
    )
}

export default PostCard

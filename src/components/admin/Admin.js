import {
  Publish,
} from "@material-ui/icons";
import React, { useState,useEffect } from "react";
import {  Col, Row } from 'react-bootstrap'
import agent from '../../api/agent';
import Sidebar from '../shared/sidebar/Sidebar';
import Topbar from '../shared/topbar/TopBar';
import { Link,useParams ,useNavigate } from "react-router-dom";
import './admin.css'

export default  function Admin (props) {
  const navigate = useNavigate ()

  const [admin, setAdmin] = useState({});
  const [file, setFile] = useState();
  const { adminId } = useParams();
 const handleFirstNameChange=(val)=>{
    admin.firstName=val
    setAdmin(admin)
    console.log(admin);
  }
 const handleLastNameChange=(val)=>{
    admin.lastName=val
    setAdmin(admin)
    console.log(admin);

  }
  const handleEdit=async(e)=>{
    e.preventDefault()
    console.log('handleEdit');
  const res= await agent.admin.edit(admin)
  console.log('res',res);
   navigate("/admins")
  }
  const handleImage=async (event)=>{
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setFile(base64)
    admin.avatar=base64
    setAdmin(admin)
  
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  useEffect( ()=>{
    async function fetchData() {
        // You can await here
    const AdminList=await agent.admin.getAll()
    const admin=AdminList.admins.filter((admin)=>admin._id===adminId)
    console.log(admin[0]);
    setAdmin(admin[0])
    setFile(admin[0].avatar)
      }
      fetchData();
},[])
  return (
    <>
    <Topbar/>
    <Row>
    <Col xs={5} md={3}>
    <Sidebar/>
    </Col>
    <Col xs={12} md={8}>
    <div className="admin">
      <div className="adminTitleContainer">
        <h1 className="adminTitle">Edit admin</h1>
      </div>
      <div className="adminContainer">
        <div className="adminShow">
          <div className="adminShowTop">
            <img
              src={file}
              alt=""
              className="adminShowImg"
            />
            <div className="adminShowTopTitle">
              <span className="adminShowadminname">{admin.firstName}</span>
              <span className="adminShowadminname">{admin.lastName}</span>
            </div>
          </div>
       
        </div>
        <div className="adminUpdate">
          <span className="adminUpdateTitle">Edit</span>
          <form className="adminUpdateForm">
            <div className="adminUpdateLeft">
              <div className="adminUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(e)=>handleFirstNameChange(e.target.value)}

                  placeholder={admin.firstName}
                  className="adminUpdateInput"
                />
              </div>
              <div className="adminUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(e)=>handleLastNameChange(e.target.value)}
                  placeholder={admin.lastName}
                  className="adminUpdateInput"
                />
              </div>
              
            </div>
            <div className="adminUpdateRight">
              <div className="adminUpdateUpload">
                <img
                  className="adminUpdateImg"
                  src={file}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="adminUpdateIcon" />
                </label>
                <input onChange={(e)=>handleImage(e)} type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={(e)=>handleEdit(e)} className="adminUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Col>
      </Row>
      </>
  );
}
import "./newAdmin.css";
import React,{useEffect,useState} from "react";
import Topbar from "../shared/topbar/TopBar";
import Sidebar from "../shared/sidebar/Sidebar";
import agent from "../../api/agent";
import {useNavigate } from "react-router-dom";

import {
    Publish,
  } from "@material-ui/icons";
export default function NewAdmin() {
    const navigate = useNavigate ()
    const [roles,SetRoles]=useState([])
    const [file, setFile] = useState();
    const [admin,setAdmin]=useState({userType:1})
    const [role, setSelectedrole] = useState("");
    const handleCreate=async (e)=>{
        e.preventDefault()
        await agent.admin.add(admin)
        navigate('/admins')

    }

    const handleImage=async (event)=>{
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setFile(base64)
        setAdmin({...admin,avatar:base64})
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
      const handleChange=(evt)=>{
      const value = evt.target.value;
      
      setAdmin({
        ...admin,
        [evt.target.name]: value
      });
      console.log('admin',admin);
    }
    const handleRole=(e)=>{
        setSelectedrole(e.target.value)
        setAdmin({...admin,role:e.target.value})
    }
    useEffect( ()=>{
        async function fetchData() {
            // You can await here
        const roles=await agent.role.getAll()
        SetRoles(roles.data)
        console.log('roles',roles);

            // ...
          }
          fetchData();
    },[])
  return (
      <>
    <Topbar/>
    <div className='flex'>
    <Sidebar/>
    <div className="adminsection">
      <h1 className="newAdminTitle">New Admin</h1>
      <form className="newAdminForm">
        <div className="newAdminItem">
          <label>First name</label>
          <input name="firstName" onChange={(e)=>handleChange(e)} type="text" placeholder="first name" />
        </div>
        <div className="newAdminItem">
          <label>Last Name</label>
          <input name="lastName" onChange={(e)=>handleChange(e)} type="text" placeholder="last name " />
        </div>
        <div className="newAdminItem">
          <label>Email</label>
          <input name="email" onChange={(e)=>handleChange(e)} type="email" placeholder="email" />
        </div>
        <div className="newAdminItem">
          <label>Password</label>
          <input name="password" onChange={(e)=>handleChange(e)} type="password" placeholder="password" />
        </div>
        <div className="newAdminItem">
        <select value={role} onChange={handleRole} name="roles" id="roles">
        <option value="">Select Role</option>
        {roles.map((role)=>(
        <option key={role._id} value={role._id}>{role.name}</option>
        ))}
        </select>
        </div>
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
        <button onClick={(e)=>handleCreate(e)} className="newAdminButton">Create</button>
      </form>
    </div>
    </div>
    </>
  );
}
import React, { useEffect,useState } from 'react'
import {  Col, Row, Table } from 'react-bootstrap'
import agent from '../../api/agent';
import Sidebar from '../shared/sidebar/Sidebar';
import Topbar from '../shared/topbar/TopBar';
import "./adminList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import Modal from '../shared/modal/Modal';
import {
  Publish,
} from "@material-ui/icons";
import {useNavigate } from "react-router-dom";
import { Modal,Box } from '@mui/material';
const AdminList = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [admins, setAdmins] = useState([]);
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
    const handleDelete = async(_id) => {
      setAdmins(admins.filter((item) => item._id !== _id));
      await agent.admin.delete({_id})
    };
    useEffect( ()=>{
        async function fetchData() {
            // You can await here
        const AdminList=await agent.admin.getAll()
        setAdmins(AdminList.admins)
        const roles=await agent.role.getAll()
        SetRoles(roles.data)

            // ...
          }
          fetchData();
      console.log('admins',admins);
    },[])
    const columns = [
      { field: "_id", headerName: "ID", width: 250 },
      
      { field: "firstName", headerName: "First Name",width: 250 },
      { field: "lastName", headerName: "Last Name",width: 250},

      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/admin/" + params.row._id}>
                <button className="adminListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="adminListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
     
    ];
    return (
      <>
      
      <Topbar/>
      <div className='flex'>
      
      <Sidebar/>
      <div className='adminsection'>
      <button className="adminAddButton" onClick={() => setIsModalOpened(true)}>Add Admin</button>
      <Modal open={isModalOpened} onClose={() => setIsModalOpened(false)}>
      <Box sx={style}>
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
      </Box>
      </Modal>
       <DataGrid
       getRowId={(row) => row._id}
        rows={admins}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
     
      </div>
      </div>
      </>
    )
}

export default AdminList
